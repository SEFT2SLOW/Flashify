document.addEventListener("DOMContentLoaded", () => {
    const tasks = document.querySelectorAll(".task");
    const schedule = document.getElementById("schedule");
    const evaluateButton = document.getElementById("evaluate");
    const feedback = document.getElementById("feedback");

    tasks.forEach(task => {
        task.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", e.target.dataset.type);
        });
    });

    schedule.addEventListener("dragover", (e) => {
        e.preventDefault(); 
    });

    schedule.addEventListener("drop", (e) => {
        e.preventDefault();
        const taskType = e.dataTransfer.getData("text/plain");
        if (taskType) {
            const newTask = document.createElement("div");
            newTask.classList.add("task");
            newTask.setAttribute("draggable", "true");
            newTask.dataset.type = taskType;
            newTask.textContent = taskType.charAt(0).toUpperCase() + taskType.slice(1);

            newTask.addEventListener("dblclick", () => {
                schedule.removeChild(newTask);
            });

            schedule.appendChild(newTask);
        }
    });

    evaluateButton.addEventListener("click", () => {
        const activities = Array.from(schedule.querySelectorAll(".task"));
        if (activities.length === 0) {
            feedback.textContent = "Ajakava on tühi! Lisa tegevusi.";
            feedback.style.color = "red";
            return;
        }

        let studyCount = 0;
        let breakCount = 0;
        let repeatCount = 0;
        let videoCount = 0;

        activities.forEach(activity => {
            const type = activity.dataset.type.toLowerCase();
            if (type === "õpi") studyCount++;
            if (type === "tee paus") breakCount++;
            if (type === "korda") repeatCount++;
            if (type === "vaata videot") videoCount++;
        });

        let message = "";
        if (studyCount >= 2 && breakCount >= 1 && repeatCount >= 1) {
            message = "Suurepärane! Sinu strateegia on tasakaalus: Õppimine, pausid ja kordamine on harmoonias.";
            feedback.style.color = "green";
        } else if (breakCount === 0) {
            message = "Lisa pause, et vältida väsimust. Õppimine ilma pausideta võib olla ebatõhus.";
            feedback.style.color = "orange";
        } else if (repeatCount === 0) {
            message = "Lisa kordamisi, et tugevdada oma teadmisi ja vähendada unustamist.";
            feedback.style.color = "orange";
        } else {
            message = "Strateegiat saab parandada: lisage tasakaalu õppimise, pauside ja kordamise vahel.";
            feedback.style.color = "orange";
        }

        feedback.textContent = message + ` Hetkel on sul ${studyCount} õppimisseanssi, ${breakCount} pausi, ${repeatCount} kordamist ja ${videoCount} video vaatamist.`;
    });
});