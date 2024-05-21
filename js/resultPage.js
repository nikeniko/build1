document.addEventListener('DOMContentLoaded', function() {
    const totalQuestions = 6;
    const correctAnswers = 4;  
    const wrongAnswers = totalQuestions - correctAnswers;
    
    const correctPercentage = (correctAnswers / totalQuestions) * 100;
    const wrongPercentage = (wrongAnswers / totalQuestions) * 100;
    
    document.getElementById('correctPercentage').innerText = `${correctPercentage.toFixed(1)}%`;
    document.getElementById('wrongPercentage').innerText = `${wrongPercentage.toFixed(1)}%`;
    document.getElementById('correctAnswers').innerText = `${correctAnswers}/${totalQuestions} questions`;
    document.getElementById('wrongAnswers').innerText = `${wrongAnswers}/${totalQuestions} questions`;
     var canvas = document.getElementById("resultsCanvas");
      var context = canvas.getContext("2d");

      // Draw the correct answers portion
      context.beginPath();
      context.arc(150, 150, 100, 0, Math.PI * 1.33);
      context.lineWidth = 30;
      context.strokeStyle = "#00e0e0";
      context.stroke();

      // Draw the wrong answers portion
      context.beginPath();
      context.arc(150, 150, 100, Math.PI * 1.33, 0);
      context.lineWidth = 30;
      context.strokeStyle = "#e000e0";
      context.stroke();
    
    const ctx = document.getElementById('chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [correctPercentage, wrongPercentage],
                backgroundColor: ['#00FFFF', '#FF00FF'],
            }],
            labels: ['Correct', 'Wrong']
        },
        options: {
            cutoutPercentage: 70,
            rotation: -Math.PI / 2,
            animation: {
                animateScale: true
            }
        }
    });
});
