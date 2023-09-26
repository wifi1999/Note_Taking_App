<script>
    export let addNote; 
    let newNote = { title: '', content: '' };
  
    async function handleAddNote() {
      console.log(newNote);
      const response = await fetch('http://localhost:3001/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newNote),
      });

      if (response.ok) {
        const addedNote = await response.json();
        addNote(addedNote);
        newNote = { title: '', content: '' };

        const notificationResponse = await fetch('http://localhost:3002/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: addedNote.id, message: 'A new note was added.' }),
        });

        if (notificationResponse.ok) {
          console.log('Notification sent successfully');
        } 
        else {
          console.error('Error sending notification');
        }
      }
    }
</script>
  
  <div class="add-note">
    <input bind:value={newNote.title} placeholder="Title" />
    <textarea bind:value={newNote.content} placeholder="Content"></textarea>
    <button on:click={handleAddNote}>Add Note</button>
  </div>
  
  <style>
    .add-note {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
  
    input, textarea {
        margin-bottom: 10px;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 100%;
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
  </style>
  