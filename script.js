const loadLesson = () =>{
    fetch ("https://openapi.programming-hero.com/api/levels/all")
        .then((res)=> res.json())
        .then ((json) => displayLesson(json.data));
};
const loadLevelWord = (id) =>{
    const url =`https://openapi.programming-hero.com/api/level/${id}`
    fetch (url)
    .then (res => res.json())
    .then (data =>displayLevelWord(data.data))
    
}
const displayLevelWord = (words) => {
    const wordContent = document.getElementById("word-content");
    wordContent.innerHTML ="";
    
    words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
    
    `
    });    
}

const displayLesson = (lessons) =>{
    const levelContent = document.getElementById("level-content");
    levelContent.innerHTML = " ";

    for (let lesson of lessons){
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
           <button onclick = "loadLevelWord (${lesson.level_no}) "  class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
        `;

        levelContent.append(btnDiv);
    }
};

loadLesson();


