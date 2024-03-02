<script>
  let responseMessage;

  async function handleSubmit(e) {
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch("/api/processImage", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();;
      responseMessage = data.message;
    } catch (error) {
      console.error("Error on the client", error)
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div>
    <label for="image">
      <span>Upload your image</span>
      <input
        name="image"
        type="file"
        accept="image/jpeg, image/jpg, image/png"
        required
      />
    </label>
    <div style="margin: 16px;">
      <button>Upload</button>
      {#if responseMessage}  
        <p>{responseMessage}</p>
      {/if}
    </div>
</form>
