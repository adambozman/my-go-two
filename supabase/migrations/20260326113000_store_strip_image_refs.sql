alter table public.website_asset_assignments
add column if not exists image_url text;

update public.website_asset_assignments waa
set image_url = concat('storage://images-mygotwo-strip/', waa.asset_key, '.', split_part(cbp.image_url, '.', array_length(string_to_array(cbp.image_url, '.'), 1)))
from public.category_bank_photos cbp
where waa.bank_photo_id = cbp.id
  and waa.image_url is null
  and cbp.image_url like '%.%';

alter table public.website_asset_assignments
alter column image_url set not null;
