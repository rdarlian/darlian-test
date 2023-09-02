<template>
  <div class="menu py-16">
    <div v-if="pending">Loading...</div>
    <div v-if="error">
      {{ error }}
    </div>
  </div>
  <div class="bg-white">
    <div
      class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
    >
      <input
        v-model.lazy="search"
        type="text"
        class="text-xl border p-2"
        placeholder="Search by tag"
      />

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
              :src="item.image"
              class="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm text-gray-700">
                {{ item.owner.firstName }}
                {{ item.owner.lastName }}
              </h3>
            </div>
          </div>
          <p class="text-sm font-medium text-gray-900">{{ item.text }}</p>

          <div class="flex gap-2 flex-wrap">
            <p
              class="text-sm font-medium text-blue-500"
              v-for="(tag, idx) in item.tags"
              :key="idx"
            >
              #{{ tag }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <Pagination @change="refresh" :currentPage="page" :totalPages="totalPage" />
  </div>
</template>
<script setup lang="ts">
// import { Pagination } from "#build/components";
import { Response, Data } from "@/interface/post";
import getContent from "@/utils/getContent";

const page = ref(0);
const limit = ref(8);
const total = ref(16);
const search = ref<string>("");
const totalPage = computed(() => {
  return Math.ceil(data.value.total / data.value.limit);
});
const apiUrl = computed(() => {
  if (search.value) {
    return `${config.public.apiBaseUrl}/tag/${search.value}/post`;
  } else {
    return `${config.public.apiBaseUrl}/post`;
  }
});
const config = useRuntimeConfig();

const { data, pending, error, refresh } = await useFetch<Response<Data[]>>(
  apiUrl.value,
  {
    onRequest({ request, options }) {
      options.headers = new Headers(options.headers);
      options.headers.set("app-id", config.public.appId);
    },
    query: { limit: limit, page: page },
  }
);

const performSearch = async () => {
  const {
    data: byid,
    pending,
    error,
    refresh,
  } = await useFetch<Response<Data[]>>(apiUrl.value, {
    onRequest({ request, options }) {
      options.headers = new Headers(options.headers);
      options.headers.set("app-id", config.public.appId);
    },
    query: { limit: limit, page: page },
  });
};
watch(
  () => search.value,
  (newValue, oldValue) => {
    performSearch();
  }
);
</script>

<style scoped></style>
