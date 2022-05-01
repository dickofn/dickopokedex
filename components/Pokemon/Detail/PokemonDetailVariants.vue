<template>
  <div class="mx-auto py-5 md:container">
    <PokemonDetailSubtitle
      :class-each-type="props.classEachType"
      text="Variants"
    />

    <div
      v-if="props.sprites"
      class="mx-auto grid grid-cols-2 gap-4 p-5 md:grid-cols-4"
    >
      <PokemonDetailVariantsItem
        v-if="props.sprites.front_default"
        title="Default"
        :img="props.sprites.front_default"
      />

      <PokemonDetailVariantsItem
        v-if="props.sprites.front_shiny"
        title="Default Shiny"
        :img="props.sprites.front_shiny"
      />

      <PokemonDetailVariantsItem
        v-if="props.sprites.front_female"
        title="Female"
        :img="props.sprites.front_female"
      />

      <PokemonDetailVariantsItem
        v-if="props.sprites.front_shiny_female"
        title="Female Shiny"
        :img="props.sprites.front_shiny_female"
      />

      <PokemonDetailVariantsItem
        v-if="props.sprites.other.home.front_default"
        title="Home"
        :img="props.sprites.other.home.front_default"
      />

      <PokemonDetailVariantsItem
        v-if="props.sprites.other.home.front_shiny"
        title="Home Shiny"
        :img="props.sprites.other.home.front_shiny"
      />

      <PokemonDetailVariantsItem
        v-if="props.sprites.other.home.front_female"
        title="Home Female"
        :img="props.sprites.other.home.front_female"
      />

      <PokemonDetailVariantsItem
        v-if="props.sprites.other.home.front_shiny_female"
        title="Home Female Shiny"
        :img="props.sprites.other.home.front_shiny_female"
      />

      <PokemonDetailVariantsItem
        v-if="props.sprites.other.dream_world.front_default"
        title="Dream World"
        :img="props.sprites.other.dream_world.front_default"
      />

      <PokemonDetailVariantsItem
        v-if="props.sprites.other.dream_world.front_female"
        title="Dream World Female"
        :img="props.sprites.other.dream_world.front_female"
      />
    </div>

    <div
      v-if="props.sprites.other['official-artwork'].front_default"
      class="mt-10"
    >
      <PokemonDetailSubtitle
        :class-each-type="props.classEachType"
        text="Official Artwork"
      />

      <div class="p-5">
        <img
          :src="props.sprites.other['official-artwork'].front_default"
          alt="Official Artwork"
          class="mx-auto"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  sprites: {
    type: Object,
    required: true,
  },
  classEachType: {
    type: String,
    default: "",
  },
});
</script>
