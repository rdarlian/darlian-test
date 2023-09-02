<template>
  <div class="flex mx-auto max-w-2xl px-4">
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 0"
      class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:bg-gray-100"
    >
      Previous
    </button>
    <button
      @click="goToPage(0)"
      :disabled="currentPage === 0"
      class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:bg-gray-100"
      :class="{ active: currentPage === 0, 'bg-blue-400': currentPage !== 0 }"
    >
      1
    </button>
    <span v-if="showStartEllipsis">...</span>
    <template v-for="page in visiblePages">
      <button
        @click="goToPage(page - 1)"
        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 active:bg-gray-100"
        :class="{ active: currentPage === 2, 'bg-blue-400': false }"
      >
        {{ page }}
      </button>
    </template>
    <span v-if="showEndEllipsis">...</span>
    <button
      @click="goToPage(totalPages - 1)"
      :disabled="currentPage === totalPages"
      class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
    >
      {{ totalPages }}
    </button>
    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      default: 10, // Jumlah halaman yang ditampilkan sebelum dan setelah halaman saat ini
    },
  },
  computed: {
    visiblePages() {
      const start = Math.max(this.currentPage - this.pageSize, 2);
      const end = Math.min(
        this.currentPage + this.pageSize,
        this.totalPages - 1
      );
      const pages = [];

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      return pages;
    },
    showStartEllipsis() {
      return this.currentPage > this.pageSize + 2;
    },
    showEndEllipsis() {
      return this.currentPage < this.totalPages - this.pageSize - 1;
    },
  },
  methods: {
    goToPage(page) {
      if (page >= 0 && page <= this.totalPages) {
        this.$router.push(`/items/${page}`);
      }
    },
  },
};
</script>
<style scoped>
.pagination {
  text-align: center;
}

.pagination span {
  margin: 0 5px;
}
</style>
