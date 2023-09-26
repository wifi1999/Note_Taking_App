<script>
  import Note from './Note.svelte';
  export let deleteNote;

  async function performSearch(query) {
      const response = await fetch('http://localhost:3003/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (response.ok) {
        const searchResults = await response.json();
        return searchResults;
      }
      return [];
  }

  let searchQuery = '';
  let searchResults = [];


  async function handleSearch() {
    searchResults = await performSearch(searchQuery);

  }
</script>

<div>
  <input type="text" bind:value={searchQuery} placeholder="Search..." />
  <button on:click={handleSearch}>Search</button>

  {#if searchResults.length > 0}
    <div class="search-results">
      {#each searchResults as result (result.id)}
        <Note note={result} deleteNote={deleteNote} />       
      {/each}
    </div>
  {:else}
    <p>No results found.</p>
  {/if}
</div>

<style>
  div {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 80%;
    margin-right: 10px;
  }

  button {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }

  button:hover {
    background-color: #0056b3;
  }

  .search-results {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
</style>