const api_url =
  "https://the-trivia-api.com/api/questions?categories=geography&limit=20&difficulty=medium";
const fetching_process = fetch(api_url)
  .then((response) => response.json())
  .then((data) => api_question(data));
var index = 0;
var count = 0;
var global_variable;

function api_question(get_apidata) {
  //assigning values to the global variable
  var childIndex = 0;
  global_variable = get_apidata;
  // trying to get the div in which questions are APPENDED through API
  if (index < 20) {
    const question = document.getElementById("anusa");
    question.innerHTML = "";
    question.innerHTML = `${index + 1}.${get_apidata[index].question}`;
    //trying to get ul
    const ul = document.getElementById("ul");
    ul.innerHTML = "";
    //trying to APPEND the list of incorrect and correct answers
    const results = get_apidata[index].incorrectAnswers;
    results.push(get_apidata[index].correctAnswer);
    console.log(get_apidata[index].correctAnswer);
    //functions used for sorting array elements
    function func() {
      return 0.5 - Math.random();
    }
    results.sort(func).map((answers) => {
      const new_element = document.createElement("div");
      new_element.id = "wish";
      var escape_free_ans = answers.split(" ").join("").replace(/['"]+/g, "");
      var correct_escape = get_apidata[index].correctAnswer
        .split(" ")
        .join("")
        .replace(/['"]+/g, "");
      new_element.innerHTML = `<li onclick=checkAnswer("${escape_free_ans}","${correct_escape}","${childIndex}") id="li" value="${escape_free_ans}">${answers}</li>`;
      ul.appendChild(new_element);
      console.log(childIndex);
      childIndex++;
    });
  } else {
    alert("End of game");
    alert("Your score is:" + count);
    window.location.href = "index.html";
  }
  index++;
}
function checkAnswer(get_answer, get_correct_ans, getChildIndex) {
  console.log(getChildIndex);
  var parent = document.querySelector("ul");
  var child = parent.querySelectorAll("li")[getChildIndex];

  if (get_answer == get_correct_ans) {
    count = count + 1;
    child.style.backgroundColor = "green";
    setTimeout(function () {
      child.style.backgroundColor = " #055198";
      api_question(global_variable);
    }, 550);
    const get_score = document.getElementById("score");
    get_score.innerHTML = `Score:${count}/20`;
  } else {
    var checkResult=document.querySelector(`li[value="${get_correct_ans}"]`);
    checkResult.style.backgroundColor="green";
    child.style.backgroundColor = "red";
    setTimeout(function () {
      child.style.backgroundColor = " #055198";
      api_question(global_variable);
    }, 550);
  }
}
