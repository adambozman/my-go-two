insert into storage.buckets (id, name, public)
values
  ('avatars-1', 'avatars-1', false),
  ('photo-bank', 'photo-bank', false),
  ('images-mygotwo-strip', 'images-mygotwo-strip', false)
on conflict (id) do nothing;

drop policy if exists avatars_1_insert on storage.objects;
create policy avatars_1_insert
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'avatars-1'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists avatars_1_update on storage.objects;
create policy avatars_1_update
on storage.objects
for update
to authenticated
using (
  bucket_id = 'avatars-1'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'avatars-1'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists avatars_1_delete on storage.objects;
create policy avatars_1_delete
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'avatars-1'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists avatars_1_select on storage.objects;
create policy avatars_1_select
on storage.objects
for select
to authenticated
using (
  bucket_id = 'avatars-1'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists photo_bank_select on storage.objects;
create policy photo_bank_select
on storage.objects
for select
to authenticated
using (bucket_id = 'photo-bank');

drop policy if exists photo_bank_insert on storage.objects;
create policy photo_bank_insert
on storage.objects
for insert
to authenticated
with check (bucket_id = 'photo-bank');

drop policy if exists photo_bank_update on storage.objects;
create policy photo_bank_update
on storage.objects
for update
to authenticated
using (bucket_id = 'photo-bank')
with check (bucket_id = 'photo-bank');

drop policy if exists photo_bank_delete on storage.objects;
create policy photo_bank_delete
on storage.objects
for delete
to authenticated
using (bucket_id = 'photo-bank');

drop policy if exists mygotwo_strip_select on storage.objects;
create policy mygotwo_strip_select
on storage.objects
for select
to authenticated
using (bucket_id = 'images-mygotwo-strip');

drop policy if exists mygotwo_strip_insert on storage.objects;
create policy mygotwo_strip_insert
on storage.objects
for insert
to authenticated
with check (bucket_id = 'images-mygotwo-strip');

drop policy if exists mygotwo_strip_update on storage.objects;
create policy mygotwo_strip_update
on storage.objects
for update
to authenticated
using (bucket_id = 'images-mygotwo-strip')
with check (bucket_id = 'images-mygotwo-strip');

drop policy if exists mygotwo_strip_delete on storage.objects;
create policy mygotwo_strip_delete
on storage.objects
for delete
to authenticated
using (bucket_id = 'images-mygotwo-strip');
