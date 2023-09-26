<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import NotesList from './NotesList.svelte';
	import AddNoteForm from './AddNoteForm.svelte';
  
	const notesStore = writable([]);
  
	onMount(() => {
	  notesStore.set([
		{ id: 1, title: 'First Note', content: 'This is the content of the first note.' },
		{ id: 2, title: 'Second Note', content: 'This is the content of the second note.' }
	  ]);
	});
  
	function addNote(newNote) {
	  	notesStore.update(notes => [...notes, { ...newNote, id: notes.length + 1 }]);
	}

	function deleteNote(noteId) {
    	notesStore.update(notes => notes.filter(note => note.id !== noteId));	
	}
  
	$: notes = $notesStore;
  </script>
  
  <div id="app">
	<h1>Note-taking App</h1>

	<div class="component">
	  <NotesList {notes} {deleteNote} />
	</div>

	<div class="component">
	  <AddNoteForm {addNote} {deleteNote} />
	</div>
  </div>
  
  <style>
	#app {
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
		font-family: Arial, sans-serif;
		background-color: #f5f5f5;
		border: 1px solid #ccc;
		border-radius: 8px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  	}

	h1 {
		text-align: center;
		font-size: 24px;
		margin-bottom: 20px;
		color: #333;
	}

	.component {
		margin-top: 20px;
		border: 1px solid #e0e0e0;
		background-color: #fff;
		border-radius: 8px;
		padding: 20px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}
  </style>
  