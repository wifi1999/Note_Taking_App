<script>
  import Note from './Note.svelte';
  import SearchComponent from './SearchComponent.svelte'; 
  export let notes;
  export let deleteNote;
</script>

<div class="notes-list">
  <SearchComponent />

  {#each notes as note (note.id)}
    <Note {note} {deleteNote} />
  {/each}
</div>

<style>
  .notes-list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
