<script>
    export let note;
    export let deleteNote;
</script>
  
<div class="note">
  <h3>{note.title}</h3>
  <p>{note.content}</p>
  <button class="delete-button" on:click={() => deleteNote(note.id)}>Delete</button>
</div>
  
  <style>
    .note {
      border: 1px solid #e0e0e0;
      background-color: #ffffff;
      padding: 16px;
      margin: 16px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    h3 {
      margin: 0;
      font-size: 20px;
      color: #333333;
    }

    p {
      margin: 8px 0;
      color: #666666;
    }

    .delete-button {
      padding: 8px 16px;
      background-color: #e74c3c;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
    }

    .delete-button:hover {
      background-color: #c0392b;
    }
  </style>
  