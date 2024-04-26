document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("dev");
  const ideaTextarea = document.getElementById("idea-container");
  const currentPhaseContainer = document.getElementById("current-phase-container");

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      ideaTextarea.style.display = "none";
      currentPhaseContainer.style.display = "none";
    } else {
      ideaTextarea.style.display = "block";
      currentPhaseContainer.style.display = "block";
    }
  });

  const submit = async () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const whatsapp = document.getElementById("whatsapp").value;
    const idea = document.getElementById("idea").value;
    const currentPhaseSelect = document.getElementById("current-phase").value;

    const userData = {
      name: name,
      email: email,
      whatsapp: whatsapp,
      idea: idea,
      currentPhase: currentPhaseSelect
    };

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        document.getElementById("idea-form").reset();
        document.getElementById("fill-fields").style.display = "none";
        alert("Enviado com sucesso!");
      } else {
        console.error("Erro ao enviar.");
      }
    } catch (error) {
      console.error("Erro de rede ao enviar.", error);
    }
  };

  const submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", async (event) => {
    event.preventDefault();
    window.location.href = "https://forms.gle/7gGQdrK7cWAEHr2TA";
  });

  const handlePhone = (event) => {
    const input = event.target;
    input.value = phoneMask(input.value);
  };

  const phoneMask = (value) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    return value;
  };

  const whatsappInput = document.getElementById("whatsapp");
  whatsappInput.addEventListener("input", (event) => {
    handlePhone(event);
  });

  // Função para validar o formulário
  function validateForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const whatsapp = document.getElementById("whatsapp").value;
    const idea = document.getElementById("idea").value;
    const currentPhaseSelect = document.getElementById("current-phase").value;

    // Verifique se algum campo obrigatório está em branco
    if (!name || !email || !whatsapp) {
      return false;
    }

    return true;
  }
});
