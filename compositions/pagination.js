export default function usePagination(totalPages) {
  // State
  const currentPage = ref(1);

  // Computed
  const visiblePages = computed(() => {
    const pageSize = 5; // Jumlah halaman yang ditampilkan sebelum dan setelah halaman saat ini
    const start = Math.max(currentPage.value - pageSize, 1);
    const end = Math.min(currentPage.value + pageSize, totalPages);
    const pages = [];

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  });

  // Methods
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      currentPage.value = page;
    }
  };

  return {
    currentPage,
    visiblePages,
    goToPage,
  };
}
