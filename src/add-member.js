const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#job");
const submitBtn = document.querySelector("#submit-btn");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  submitBtn.textContent = "Loading...";

  const data = {
    name: nameInput.value,
    job: jobInput.value,
  };

  try {
    const res = await fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert("successful");
      submitBtn.textContent = "Save";
    } else {
      alert("unsuccessful");
    }
  } catch (error) {
    throw new Error(error.message);
  }
});
