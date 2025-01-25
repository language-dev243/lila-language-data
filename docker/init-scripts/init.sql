\connect spanish;

create table
  public.spanish_adjectives (
    created_at timestamp with time zone not null default now(),
    id uuid not null default gen_random_uuid (),
    singular_masculine text not null,
    singular_feminine text null,
    plural_masculine text null,
    plural_feminine text null,
    ipa_singular_masculine text null,
    ipa_singular_feminine text null,
    ipa_plural_masculine text null,
    ipa_plural_feminine text null,
    syllabification_singular_masculine text null,
    syllable_count_singular_masculine integer null,
    syllabification_singular_feminine text null,
    syllable_count_singular_feminine integer null,
    syllabification_plural_masculine text null,
    syllable_count_plural_masculine integer null,
    syllabification_plural_feminine text null,
    syllable_count_plural_feminine integer null,
    links_to_audio_files_singular_masculine text[] null,
    links_to_audio_files_singular_feminine text[] null,
    links_to_audio_files_plural_masculine text[] null,
    links_to_audio_files_plural_feminine text[] null,
    english_translations text[] null,
    french_translations text[] null,
    italian_translations text[] null,
    german_translations text[] null,
    constraint spanish_adjectives_pkey primary key (id),
    constraint spanish_adjectives_id_key unique (id),
    constraint spanish_adjectives_singular_masculine_key unique (singular_masculine)
  ) tablespace pg_default;
