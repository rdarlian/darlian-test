<template>
  <div
    class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
  >
    <div
      class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
    >
      <div
        v-for="(item, index) in data?.data"
        :key="index"
        class="group relative"
      >
        <div
          class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
        >
          <img
            :src="item.picture"
            class="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div class="mt-4 flex justify-between">
          <div>
            <h3 class="text-sm text-gray-700">
              {{ item.firstName }}
              {{ item.lastName }}
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Response, Data } from "@/interface/user";
const list = reactive({
  limit: 10,
});
const config = useRuntimeConfig();
const { data, pending, error, refresh } = await useFetch<Response<Data[]>>(
  `${config.public.apiBaseUrl}/user`,
  {
    onRequest({ request, options }) {
      options.headers = new Headers(options.headers);
      options.headers.set("app-id", config.public.appId);
    },
    query: { limit: 8 },
  }
);
</script>
