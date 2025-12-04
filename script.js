const createElement = (arr) =>{
    const element = arr.map((el) =>`<span class ="btn"> ${el} </span>`)
    return element.join(" ")
}

const loadLesson = () =>{
    fetch ("https://openapi.programming-hero.com/api/levels/all")
        .then((res)=> res.json())
        .then ((json) => displayLesson(json.data));
};

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach((btn) =>btn.classList.remove("active"));
};

const loadLevelWord = (id) =>{
    const url =`https://openapi.programming-hero.com/api/level/${id}`
    fetch (url)
    .then (res => res.json())
    .then (data =>{
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`)
        clickBtn.classList.add("active")
        
        displayLevelWord(data.data)
    })
    
}

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetail(details.data);
};

const displayWordDetail = (word) =>{
    const detailsBox = document.getElementById("detail-content")
    detailsBox.innerHTML =`
       <div class="">
                <h2 class="text-xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>
              </div>
              <div class="">
                <h2 class="font-bold">Meaning</h2>
                <p>${word.meaning}</p>
              </div>
              <div class="">
                <h2 class="font-bold">Example</h2>
                <p>${word.sentence}</p>
              </div>
              <div class="">
                <h2 class="font-bold">সমার্থক শব্দ গুলো</h2>
                <div>${createElement(word.synonyms)}</div>
              </div>    
    `;
    document.getElementById("word_modal").showModal();
}
const displayLevelWord = (words) => {
    const wordContent = document.getElementById("word-content");
    wordContent.innerHTML ="";

    if (words.length === 0) {
        wordContent.innerHTML = `
        <div class="text-center space-y-3 col-span-full ">
        <img class ="mx-auto" src ="/assets/alert-error.png">
        <p class="bangla font-semibold text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="bangla text-4xl font-bold">নেক্সট Lesson এ যান</h2>
      </div>
      `
        
    }
    words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="bg-white py-10 px-5 text-center rounded-xl space-y-3">
        <h2 class="font-bold text-[30px]">${word.word ?word.word :"শব্দ পাওয়া যায় নি" }</h2>
        <p class="text-xl">Meaning /Pronounciation</p>
        <div class="bangla text-[20px] font-semibold">"${word.meaning ?word.meaning : "অর্থ পাওয়া যায় নি"  }/${word.pronunciation}"</div>
        <div class="justify-between flex items-center">
          <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
    `;
    wordContent.append(card);
    });    
}

const displayLesson = (lessons) =>{
    const levelContent = document.getElementById("level-content");
    levelContent.innerHTML = " ";

    for (let lesson of lessons){
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
           <button id ="lesson-btn-${lesson.level_no}" onclick = "loadLevelWord (${lesson.level_no}) "  class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
        `;

        levelContent.append(btnDiv);
    }
};

loadLesson();


