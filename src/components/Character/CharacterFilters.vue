<template>
  <div class="relative flex items-center space-x-2" style="flex-shrink: 0;">
    <div class="relative hidden sm:block">
      <input-field
        v-model="searchQuery"
        @update:modelValue="handleSearch"
        placeholder="Search by name..."
      >
        <template #icon>
          <magnifying-glass-icon class="w-4 h-4" />
        </template>
      </input-field>
    </div>
    <filters :is-open="isFilterOpen" @toggle="toggleFilter" @close="closeFilter">
      <div class="sm:hidden mb-4">
          <div class="relative">
            <input-field
              v-model="searchQuery"
              @update:modelValue="handleSearch"
              placeholder="Search by name..."
              full-width
            >
              <template #icon>
                <magnifying-glass-icon class="w-4 h-4" />
              </template>
            </input-field>
          </div>
        </div>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Status</label>
          <select
            v-model="statusFilter"
            @change="applyFilters"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
          >
            <option value="">Any</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Species</label>
          <input
            v-model="speciesFilter"
            @input="applyFilters"
            type="text"
            placeholder="Enter species..."
            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Type</label>
          <input
            v-model="typeFilter"
            @input="applyFilters"
            type="text"
            placeholder="Enter type..."
            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Gender</label>
          <select
            v-model="genderFilter"
            @change="applyFilters"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
          >
            <option value="">Any</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
        <button
          @click="clearFilters"
          class="w-full p-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
        >
          Clear Filters
        </button>
      </div>
    </filters>
  </div>
</template>

<script setup lang="ts">
import { ref, } from 'vue';
import { useCharacterStore } from '@/stores/characterStore';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import InputField from '@/components/Common/InputField.vue';
import Filters from '@/components/Common/Filters.vue';

const characterStore = useCharacterStore();

const searchQuery = ref('');
const isFilterOpen = ref(false);
const statusFilter = ref('');
const speciesFilter = ref('');
const typeFilter = ref('');
const genderFilter = ref('');

const debounce = (fn: (...args: any[]) => void, delay: number) => {
  let timeoutId: number;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

const handleSearch = debounce(async () => {
  await characterStore.appplyFilters({
    name: searchQuery.value,
    page: 1,
  });
}, 300);

const applyFilters = async () => {
  await characterStore.appplyFilters({
    status: statusFilter.value,
    species: speciesFilter.value,
    type: typeFilter.value,
    gender: genderFilter.value,
    page: 1,
  });
};

const clearFilters = async () => {
  searchQuery.value = '';
  statusFilter.value = '';
  speciesFilter.value = '';
  typeFilter.value = '';
  genderFilter.value = '';
  console.log('Clearing filters, searchQuery:', searchQuery.value);
  await characterStore.clearFilters();
};

const toggleFilter = () => {
  isFilterOpen.value = !isFilterOpen.value;
};

const closeFilter = () => {
  isFilterOpen.value = false;
};
</script>

<style scoped>
</style>