document.addEventListener("DOMContentLoaded", () => {
    const tasks = document.querySelectorAll(".task");
    const timeline = document.getElementById("timeline");
    const evaluateButton = document.getElementById("evaluate");
    const feedback = document.getElementById("feedback");

    tasks.forEach(task => {
        task.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text", e.target.dataset.type);
        });
    });

    timeline.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    timeline.addEventListener("drop", (e) => {
        const taskType = e.dataTransfer.getData("text");
        const newTask = document.createElement("div");
        newTask.classList.add("task");
        newTask.textContent = taskType.charAt(0).toUpperCase() + taskType.slice(1);
        newTask.dataset.type = taskType;
        timeline.appendChild(newTask);
    });

    evaluateButton.addEventListener("click", () => {
        const activities = Array.from(timeline.querySelectorAll(".task"));
        if (activities.length === 0) {
            feedback.textContent = "Ajakava on tühi! Lisa tegevusi.";
            feedback.style.color = "red";
            return;
        }

        let studyCount = 0;
        let breakCount = 0;

        activities.forEach(activity => {
            if (activity.dataset.type === "study") studyCount++;
            if (activity.dataset.type === "break") breakCount++;
        });

        if (studyCount >= 2 && breakCount >= 1) {
            feedback.textContent = "Suurepärane! Sinu õppimisstrateegia tundub efektiivne!";
            feedback.style.color = "green";
        } else if (breakCount === 0) {
            feedback.textContent = "Lisa pause, et vältida väsimust!";
            feedback.style.color = "orange";
        } else {
            feedback.textContent = "Õppimisstrateegiat saaks paremini tasakaalustada.";
            feedback.style.color = "orange";
        }
    });
});