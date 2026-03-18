import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth, SUBSCRIPTION_TIERS } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";

interface SubscriptionSectionProps {
  onBack: () => void;
}

const SubscriptionSection = ({ onBack }: SubscriptionSectionProps) => {
  const { subscribed, subscriptionLoading, subscriptionEnd, session, checkSubscription } = useAuth();
  const { toast } = useToast();
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);

  const handleCheckout = async (priceId: string) => {
    if (!session?.access_token) return;
    setCheckoutLoading(priceId);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { priceId },
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, "_blank");
      }
    } catch (err: any) {
      toast({ title: "Checkout failed", description: err.message, variant: "destructive" });
    } finally {
      setCheckoutLoading(null);
    }
  };

  const handleManage = async () => {
    if (!session?.access_token) return;
    setPortalLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("customer-portal", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, "_blank");
      }
    } catch (err: any) {
      toast({ title: "Could not open portal", description: err.message, variant: "destructive" });
    } finally {
      setPortalLoading(false);
    }
  };

  const formattedEnd = subscriptionEnd
    ? new Date(subscriptionEnd).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : null;

  return (
    <div className="mx-auto" style={{ maxWidth: 520 }}>
      <button
        onClick={onBack}
        className="hover:underline block text-left"
        style={{ color: '#2d6870', fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, marginBottom: 12 }}
      >
        ← Back to Settings
      </button>
      <div className="card-design-neumorph text-center" style={{ padding: 40 }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 28, color: 'var(--swatch-teal)' }} className="mb-6">Subscription</h2>

        {subscriptionLoading ? (
          <p className="text-sm" style={{ color: 'var(--swatch-text-light)' }}>Checking subscription…</p>
        ) : subscribed ? (
          /* ── Active Subscriber ── */
          <div className="space-y-6">
            <div className="p-5 rounded-2xl" style={{ background: 'rgba(var(--swatch-gypsum-rose-rgb), 0.25)', border: '2px solid var(--swatch-teal)' }}>
              <p className="text-sm font-semibold mb-2" style={{ color: 'var(--swatch-teal)' }}>Current Plan</p>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full inline-block mb-2" style={{ background: 'var(--swatch-teal)', color: 'white' }}>
                Premium
              </span>
              <p className="text-xs mt-1" style={{ color: 'var(--swatch-text-light)' }}>
                No ads · Increased AI usage
              </p>
              {formattedEnd && (
                <p className="text-xs mt-2" style={{ color: 'var(--swatch-text-light)' }}>
                  Renews {formattedEnd}
                </p>
              )}
            </div>
            <Button
              className="rounded-full"
              variant="outline"
              style={{ width: 280 }}
              onClick={handleManage}
              disabled={portalLoading}
            >
              {portalLoading ? "Loading…" : "Manage Subscription"}
            </Button>
          </div>
        ) : (
          /* ── Free User ── */
          <div className="space-y-6">
            {/* Free tier */}
            <div className="p-5 rounded-2xl text-left" style={{ background: 'rgba(var(--swatch-gypsum-rose-rgb), 0.25)', border: '2px solid var(--swatch-teal)' }}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold" style={{ color: 'var(--swatch-teal)' }}>Free</p>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: 'var(--swatch-teal)', color: 'white' }}>
                  Your Plan
                </span>
              </div>
              <p className="text-xl font-bold mb-3" style={{ color: 'var(--swatch-teal)' }}>$0<span className="text-xs font-normal">/month</span></p>
              <ul className="space-y-1.5">
                {["Basic lists & cards", "Limited AI recommendations"].map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs" style={{ color: 'var(--swatch-text-light)' }}>
                    <Check className="h-3 w-3 shrink-0" style={{ color: 'var(--swatch-teal)' }} /> {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Premium tier */}
            <div className="p-5 rounded-2xl text-left" style={{ border: '1px solid rgba(var(--swatch-teal-rgb), 0.2)' }}>
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--swatch-teal)' }}>Premium</p>
              <p className="text-xl font-bold mb-3" style={{ color: 'var(--swatch-teal)' }}>$7.99<span className="text-xs font-normal">/month</span></p>
              <ul className="space-y-1.5 mb-4">
                {["No ads", "Increased AI usage", "Unlimited lists & cards", "Priority support"].map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs" style={{ color: 'var(--swatch-text-light)' }}>
                    <Check className="h-3 w-3 shrink-0" style={{ color: 'var(--swatch-teal)' }} /> {f}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-2">
                <Button
                  className="rounded-full w-full"
                  style={{ background: '#d4543a', color: 'white', boxShadow: '0 4px 20px rgba(212,84,58,0.3)' }}
                  onClick={() => handleCheckout(SUBSCRIPTION_TIERS.premium.monthly_price_id)}
                  disabled={checkoutLoading === SUBSCRIPTION_TIERS.premium.monthly_price_id}
                >
                  {checkoutLoading === SUBSCRIPTION_TIERS.premium.monthly_price_id ? "Loading…" : "Upgrade Monthly — $7.99/mo"}
                </Button>
                <Button
                  className="rounded-full w-full"
                  variant="outline"
                  onClick={() => handleCheckout(SUBSCRIPTION_TIERS.premium.yearly_price_id)}
                  disabled={checkoutLoading === SUBSCRIPTION_TIERS.premium.yearly_price_id}
                >
                  {checkoutLoading === SUBSCRIPTION_TIERS.premium.yearly_price_id ? "Loading…" : "Upgrade Yearly — $59.99/yr (save 37%)"}
                </Button>
              </div>
            </div>

            <div className="border-t pt-4" style={{ borderColor: 'rgba(var(--swatch-teal-rgb), 0.1)' }}>
              <p className="text-xs" style={{ color: 'var(--swatch-text-light)' }}>
                You can cancel anytime from the subscription portal.
              </p>
            </div>
          </div>
        )}

        {/* Refresh button */}
        <button
          onClick={checkSubscription}
          className="mt-4 text-xs hover:underline"
          style={{ color: '#2d6870', fontFamily: "'Jost', sans-serif" }}
        >
          Refresh subscription status
        </button>
      </div>
    </div>
  );
};

export default SubscriptionSection;
