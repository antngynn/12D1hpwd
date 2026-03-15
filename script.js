// ====== DANH SÁCH ẢNH NỀN CHO 10 CÂU HỎI (Giữ nguyên thứ tự của bro) ======
const backgroundImages = [
  "10th.jpg", "front.jpg", "10th.jpg", "des.jpg", "quansu.jpg",
  "2gether1.jpg", "ky.jpg", "12.jpg", "random.jpg", "backstage.jpg",
  "2gether1.jpg", "2gether2.jpg", "rain.jpg"
];

function changeBackground(index) {
  if (backgroundImages[index]) {
    document.body.style.backgroundImage = `url('${backgroundImages[index]}')`;
  }
}
// Gọi ngay để hiện ảnh lúc mới vào web
changeBackground(0);

// ===============================================

const startPage = document.getElementById("start-page");
const quizPage = document.getElementById("quiz-page");
const resultPage = document.getElementById("result-page");
const finalPage = document.getElementById("final-page");

const startButton = document.getElementById("start-button");
const goFinalButton = document.getElementById("go-final-button");
const restartFromFinalButton = document.getElementById("restart-from-final");

const questionTitle = document.getElementById("question-title");
const answersContainer = document.getElementById("answers");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");
const questionCard = document.getElementById("question-card");

const resultName = document.getElementById("result-name");
const resultSubtitle = document.getElementById("result-subtitle");
const resultKeywords = document.getElementById("result-keywords");
const resultLongText = document.getElementById("result-long-text");

const scores = { rose: 0, lavender: 0, vanilla: 0, ocean: 0, jasmine: 0 };
let currentQuestionIndex = 0;
let currentResultBg = ""; // Biến để nhớ ảnh kết quả

const questions = [
  {
    question: "Nếu trái tim bạn có một cách tỏa sáng riêng, nó sẽ giống điều gì nhất?",
    answers: [
      { text: "Một ánh đèn vàng rất ấm, không chói lóa nhưng khiến ai ở gần cũng thấy dễ chịu.", type: "vanilla" },
      { text: "Một buổi sớm có gió, dịu nhẹ và đủ khiến người ta bình tâm lại.", type: "lavender" },
      { text: "Ánh nắng đi qua rèm cửa, mềm mại nhưng vẫn rực rỡ theo cách rất riêng.", type: "rose" },
      { text: "Mặt biển phản chiếu bầu trời, trong trẻo, rộng và khó đoán hết được.", type: "ocean" },
      { text: "Một ngọn nến nhỏ trong phòng tối, lặng lẽ nhưng vẫn âm thầm sưởi ấm mọi thứ.", type: "jasmine" }
    ]
  },
  {
    question: "Khi người khác nhắc đến bạn, bạn muốn họ nhớ nhất điều gì?",
    answers: [
      { text: "Rằng mình là người dịu dàng, biết yêu thương và luôn khiến người khác thấy được trân trọng.", type: "rose" },
      { text: "Rằng ở cạnh mình, họ được nghỉ ngơi khỏi những bộn bề của cuộc sống.", type: "lavender" },
      { text: "Rằng mình đem lại cảm giác ngọt ngào, ấm áp và rất đỗi thân quen.", type: "vanilla" },
      { text: "Rằng mình tự do, sâu sắc và có một thế giới nội tâm rất đẹp.", type: "ocean" },
      { text: "Rằng mình tử tế thật lòng, không cần phô bày mà vẫn đủ làm người khác nhớ mãi.", type: "jasmine" }
    ]
  },
  {
    question: "Trong những ngày mệt mỏi nhất, bạn thường là kiểu người như thế nào?",
    answers: [
      { text: "Vẫn cố mỉm cười và chăm sóc cảm xúc của những người xung quanh.", type: "jasmine" },
      { text: "Tìm một góc thật yên để tự mình lắng lại, sắp xếp mọi thứ trong lòng.", type: "lavender" },
      { text: "Muốn được ở cạnh người mình tin tưởng, chỉ cần một cái ôm nhẹ cũng đủ.", type: "rose" },
      { text: "Tự chữa lành bằng những điều nhỏ bé như đồ ngọt, nhạc nhẹ, ánh đèn êm.", type: "vanilla" },
      { text: "Muốn bước ra một nơi thật rộng, thật thoáng để thở sâu và thấy lòng mình mở ra.", type: "ocean" }
    ]
  },
  {
    question: "Nếu tình bạn của bạn là một nơi chốn, nó sẽ là gì?",
    answers: [
      { text: "Một căn phòng sáng đèn, lúc nào cũng có chỗ cho những tâm sự chân thành.", type: "vanilla" },
      { text: "Một khu vườn yên tĩnh, ít ồn ào nhưng ai bước vào cũng thấy lòng dịu lại.", type: "lavender" },
      { text: "Một góc ban công ngập nắng, nơi tiếng cười và sự dịu dàng luôn tồn tại cùng nhau.", type: "rose" },
      { text: "Một cung đường dài với bầu trời rộng, nơi người ta được là chính mình.", type: "ocean" },
      { text: "Một mái hiên ngày mưa, bình dị thôi nhưng luôn khiến người khác thấy an toàn.", type: "jasmine" }
    ]
  },
  {
    question: "Điều đẹp nhất ở một cô gái, theo bạn, là gì?",
    answers: [
      { text: "Là sự mềm mại nhưng không yếu đuối, biết yêu thương nhưng vẫn có nguyên tắc riêng.", type: "rose" },
      { text: "Là khả năng khiến những người xung quanh cảm thấy bình yên chỉ bằng cách hiện diện.", type: "lavender" },
      { text: "Là một trái tim ấm, biết nâng niu những điều nhỏ bé và bình thường nhất.", type: "vanilla" },
      { text: "Là tinh thần tự do, dám sống thật với cảm xúc và con người của mình.", type: "ocean" },
      { text: "Là lòng tốt âm thầm, không ồn ào nhưng đủ làm cả một ngày của ai đó sáng hơn.", type: "jasmine" }
    ]
  },
  {
    question: "Khi đứng trước một người bạn rất quý, bạn thường mang đến cảm giác gì?",
    answers: [
      { text: "Được lắng nghe và được yêu thương một cách rất chân thành.", type: "rose" },
      { text: "Được thả lỏng, được bình tĩnh lại, như vừa đi qua một khoảng trời rất dịu.", type: "lavender" },
      { text: "Được chăm sóc bởi những điều nhỏ xíu nhưng đáng nhớ vô cùng.", type: "vanilla" },
      { text: "Được truyền cảm hứng để mạnh dạn hơn, sống thật hơn.", type: "ocean" },
      { text: "Được an ủi bằng sự tử tế rất đỗi nhẹ nhàng.", type: "jasmine" }
    ]
  },
  {
    question: "Nếu cảm xúc của bạn có thể hóa thành một mùa, đó sẽ là mùa nào?",
    answers: [
      { text: "Mùa xuân, vì trái tim mình luôn có phần dịu dàng và đầy hy vọng.", type: "rose" },
      { text: "Cuối thu, khi mọi thứ lắng xuống và con người ta dễ nghe thấy lòng mình nhất.", type: "lavender" },
      { text: "Đầu đông, lúc người ta chỉ cần một điều ấm áp là đủ thấy hạnh phúc.", type: "vanilla" },
      { text: "Mùa hè, rộng mở, trong trẻo và đầy những giấc mơ chưa gọi thành tên.", type: "ocean" },
      { text: "Một ngày giao mùa, rất nhẹ nhưng để lại cảm giác thương nhớ rất lâu.", type: "jasmine" }
    ]
  },
  {
    question: "Bạn nghĩ mình mạnh mẽ nhất ở điểm nào?",
    answers: [
      { text: "Biết yêu người khác bằng cả sự dịu dàng nhưng vẫn không đánh mất bản thân.", type: "rose" },
      { text: "Biết giữ lòng mình yên giữa rất nhiều xô bồ và áp lực.", type: "lavender" },
      { text: "Biết lan tỏa sự ấm áp ngay cả khi bản thân cũng đang có những ngày không ổn.", type: "vanilla" },
      { text: "Biết bước tiếp, biết trưởng thành và vẫn giữ cho tâm hồn mình rộng mở.", type: "ocean" },
      { text: "Biết lựa chọn tử tế trong một thế giới đôi khi chẳng dễ dàng để dịu dàng.", type: "jasmine" }
    ]
  },
  {
    question: "Nếu thanh xuân của bạn để lại một dư vị, bạn muốn đó là gì?",
    answers: [
      { text: "Một dư vị ngọt mềm, khiến người ta nhớ về bằng nụ cười rất êm.", type: "vanilla" },
      { text: "Một dư vị trong trẻo và sâu lắng, càng nghĩ lại càng thấy đẹp.", type: "lavender" },
      { text: "Một dư vị ấm áp và rực rỡ, như những ngày có nắng len qua kẽ tay.", type: "rose" },
      { text: "Một dư vị rộng và xanh, của những giấc mơ từng rất lớn và rất thật.", type: "ocean" },
      { text: "Một dư vị dịu lành, như có ai đó từng xuất hiện và khiến mọi thứ mềm đi một chút.", type: "jasmine" }
    ]
  },
  {
    question: "Trong ngày 8/3, lời khen nào khiến bạn thấy được chạm đến nhất?",
    answers: [
      { text: "Cậu dịu dàng thật đấy, nhưng chính sự dịu dàng ấy lại khiến người khác rất nể phục.", type: "rose" },
      { text: "Ở cạnh cậu, mọi thứ như chậm lại một chút và bình yên hơn rất nhiều.", type: "lavender" },
      { text: "Cậu đem đến cảm giác thân thuộc và ấm áp như một điều nhỏ bé nhưng rất quý.", type: "vanilla" },
      { text: "Cậu làm người khác muốn sống thật hơn, can đảm hơn và mơ nhiều hơn.", type: "ocean" },
      { text: "Cậu tốt theo một cách rất đẹp, không cần cố gắng để nổi bật mà vẫn đáng nhớ vô cùng.", type: "jasmine" }
    ]
  }
];

// ====== KẾT QUẢ VÀ TÊN ẢNH NỀN TƯƠNG ỨNG (NỘI DUNG ĐÃ ĐƯỢC KÉO DÀI) ======
const results = {
  rose: {
    name: "🌹 ROSE BLOOM",
    subtitle: "Bạn là mùi hương của sự dịu dàng, tinh tế và một trái tim biết yêu thương thật sâu.",
    keywords: ["Dịu dàng", "Tinh tế", "Ấm áp", "Đáng nhớ"],
    theme: "theme-rose",
    bgImage: "./rose.jpg",
    longText: `
      <p>Bạn giống như hương hoa hồng vào một buổi sáng có nắng rất nhẹ — không quá ồn ào, không cần phô trương, nhưng chỉ cần xuất hiện thôi cũng đủ khiến không gian xung quanh trở nên mềm mại hơn.</p>
      <p>Điều đáng quý nhất ở bạn nằm ở cách bạn khiến sự quan tâm trở nên chân thành. Bạn nhớ những điều nhỏ xíu, để ý những thay đổi rất khẽ trong cảm xúc của người khác. Bạn đẹp theo kiểu khiến người ta càng ở gần càng thấy thương, càng biết càng thấy quý.</p>
    `
  },
  lavender: {
    name: "💜 LAVENDER HUSH",
    subtitle: "Bạn là mùi hương của sự bình yên, sâu lắng và cảm giác được nghỉ ngơi.",
    keywords: ["Bình yên", "Sâu lắng", "Nhẹ nhàng", "Chữa lành"],
    theme: "theme-lavender",
    bgImage: "./lavender.jpg",
    longText: `
      <p>Bạn giống như mùi lavender vương trên vạt áo vào một ngày lộng gió — nhẹ nhàng, yên tĩnh nhưng có khả năng xoa dịu mọi bão giông trong lòng người đối diện.</p>
      <p>Sức mạnh của bạn không nằm ở sự phô trương mà ở sự tĩnh lặng. Bạn là nơi an toàn mà bạn bè tìm đến khi mệt mỏi, là người lắng nghe không phán xét. Sự hiện diện của bạn giống như một nốt trầm xao xuyến, khiến thanh xuân của chúng ta trở nên cân bằng và dịu dàng hơn bao giờ hết.</p>
    `
  },
  vanilla: {
    name: "🍦 VANILLA GLOW",
    subtitle: "Bạn là mùi hương của sự ấm áp, ngọt ngào và những niềm vui nhỏ bé.",
    keywords: ["Ấm áp", "Ngọt ngào", "Thân thuộc", "Dễ mến"],
    theme: "theme-vanilla",
    bgImage: "./vanilla.jpg",
    longText: `
      <p>Bạn mang trong mình sự ngọt ngào nồng nàn của Vanilla — một mùi hương của sự tử tế, của căn bếp sáng đèn và những cái ôm ấm áp giữa mùa đông lạnh giá.</p>
      <p>Trong cuộc đời này, sự thân thuộc đôi khi còn quý hơn cả vẻ rực rỡ. Bạn khiến người khác thấy được là chính mình khi ở bên cạnh. Trái tim bạn giống như một ngọn lửa nhỏ, không bao giờ tắt, luôn âm thầm lan tỏa hy vọng và niềm vui đến cho mọi mảnh ghép trong tập thể 12D1 này.</p>
    `
  },
  ocean: {
    name: "🌊 OCEAN MIST",
    subtitle: "Bạn là mùi hương của tự do, trong trẻo và một tâm hồn rộng lớn.",
    keywords: ["Tự do", "Trong trẻo", "Sâu sắc", "Truyền cảm hứng"],
    theme: "theme-ocean",
    bgImage: "./ocean.jpg",
    longText: `
      <p>Bạn giống như mùi hương của biển sau cơn gió sớm — trong vắt, tràn đầy sức sống và luôn mang theo khát khao hướng về những chân trời mới xa xôi.</p>
      <p>Bạn sở hữu một tinh thần tự do, không chịu gò bó và luôn có cái nhìn sâu sắc về thế giới. Bạn truyền cảm hứng cho mọi người xung quanh sống can đảm hơn, dám mơ những giấc mơ lớn hơn. Dù cuộc sống có sóng gió, bạn vẫn luôn giữ được vẻ tĩnh lặng và bao dung như đại dương vô tận.</p>
    `
  },
  jasmine: {
    name: "🌼 JASMINE WHISPER",
    subtitle: "Bạn là mùi hương của sự tử tế, thuần hậu và vẻ đẹp âm thầm.",
    keywords: ["Tử tế", "Âm thầm", "Dịu lành", "Đáng quý"],
    theme: "theme-jasmine",
    bgImage: "./jasmine.jpg",
    longText: `
      <p>Bạn giống như hương hoa nhài nở rộ trong đêm tĩnh mịch — khiêm nhường, thanh khiết nhưng dư vị lại lưu luyến mãi không chịu rời đi.</p>
      <p>Bạn không chọn cách tỏa sáng rực rỡ dưới ánh đèn, mà chọn cách tử tế bằng những hành động âm thầm. Sự kiên định và lòng tốt thuần hậu của bạn là thứ keo gắn kết tuyệt vời nhất. Cảm ơn bạn vì đã bảo vệ sự mềm mại của mình giữa một thế giới vội vã, để chúng ta biết rằng sự chân thành vẫn luôn tồn tại.</p>
    `
  }
};

// Hàm trộn mảng (Fisher-Yates Shuffle)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Tráo đổi vị trí
  }
  return array;
}

function resetScores() {
  for (let key in scores) { scores[key] = 0; }
}

function startQuiz() {
  resetScores();
  currentQuestionIndex = 0;
  startPage.classList.add("hidden");
  resultPage.classList.add("hidden");
  finalPage.classList.add("hidden");
  quizPage.classList.remove("hidden");
  
  changeBackground(1);
  showQuestion();
}

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  const questionNumber = currentQuestionIndex + 1;
  const progressPercent = (questionNumber / questions.length) * 100;

  progressText.textContent = `Câu ${questionNumber} / ${questions.length}`;
  progressFill.style.width = `${progressPercent}%`;

  questionTitle.textContent = currentQuestion.question;
  answersContainer.innerHTML = "";

  // Hiệu ứng Fade-in cho câu hỏi
  questionCard.classList.remove("fade-in");
  void questionCard.offsetWidth; 
  questionCard.classList.add("fade-in");

  // --- LOGIC TRÁO ĐÁP ÁN ---
  // Tạo một bản sao của mảng đáp án để không làm hỏng dữ liệu gốc
  const shuffledAnswers = shuffle([...currentQuestion.answers]);

  shuffledAnswers.forEach((answer) => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.textContent = answer.text;

    button.addEventListener("click", () => {
      scores[answer.type]++;
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        changeBackground(currentQuestionIndex + 1);
        showQuestion();
      } else {
        showResult();
      }
    });
    answersContainer.appendChild(button);
  });
}

function getTopResult() {
  let topType = "rose";
  let highestScore = -1;
  for (let type in scores) {
    if (scores[type] > highestScore) {
      highestScore = scores[type];
      topType = type;
    }
  }
  return topType;
}

function showResult() {
  const topType = getTopResult();
  const result = results[topType];

  quizPage.classList.add("hidden");
  resultPage.classList.remove("hidden");
  
  // Lưu ảnh kết quả và đổi nền
  currentResultBg = result.bgImage;
  document.body.style.backgroundImage = `url('${currentResultBg}')`;

  // Nhét ảnh kết quả vào lọ ở trang kết quả
  const resultImg = document.getElementById("result-perfume-img");
  if (resultImg) resultImg.src = currentResultBg;

  resultName.textContent = result.name;
  resultSubtitle.textContent = result.subtitle;
  resultLongText.innerHTML = result.longText;

  resultKeywords.innerHTML = "";
  result.keywords.forEach((word) => {
    const span = document.createElement("span");
    span.className = "keyword";
    span.textContent = word;
    resultKeywords.appendChild(span);
  });

  resultPage.className = "result-page fade-in"; 
  resultPage.classList.add(result.theme);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showFinalPage() {
  resultPage.classList.add("hidden");
  finalPage.classList.remove("hidden");
  
  changeBackground(12); // Hiện ảnh rain.jpg ở background
  
  // Nhét ảnh kết quả vào lọ ở trang cuối cho khớp với feature
  const finalImg = document.getElementById("final-perfume-img");
  if (finalImg && currentResultBg !== "") {
    finalImg.src = currentResultBg; 
  }
  
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Hàm chọn ảnh ngẫu nhiên cho lọ trang đầu
function setRandomStartImg() {
    const resultImages = ["rose.jpg", "lavender.jpg", "vanilla.jpg", "ocean.jpg", "jasmine.jpg"];
    const randomIndex = Math.floor(Math.random() * resultImages.length);
    const startImg = document.getElementById("start-perfume-img");
    if (startImg) {
        startImg.src = "./" + resultImages[randomIndex];
    }
}

// Gọi hàm này ngay lập tức để có ảnh random lúc mở web
setRandomStartImg();

// Gán sự kiện cho các nút
startButton.addEventListener("click", startQuiz);
goFinalButton.addEventListener("click", showFinalPage);

restartFromFinalButton.addEventListener("click", () => {
  finalPage.classList.add("hidden");
  startPage.classList.remove("hidden");
  
  changeBackground(0); // Về lại ảnh đầu
  setRandomStartImg(); // Reset lại ảnh random trang đầu
  window.scrollTo({ top: 0, behavior: "smooth" });
});
