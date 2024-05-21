document.addEventListener('DOMContentLoaded', function() {
    const totalQuestions = 6;
    const correctAnswers = 4;  // Questo numero deve essere dinamico in base alle risposte corrette
    const wrongAnswers = totalQuestions - correctAnswers;
    
    const correctPercentage = (correctAnswers / totalQuestions) * 100;
    const wrongPercentage = (wrongAnswers / totalQuestions) * 100;
    
    document.getElementById('correctPercentage').innerText = `${correctPercentage.toFixed(1)}%`;
    document.getElementById('wrongPercentage').innerText = `${wrongPercentage.toFixed(1)}%`;
    document.getElementById('correctAnswers').innerText = `${correctAnswers}/${totalQuestions} questions`;
    document.getElementById('wrongAnswers').innerText = `${wrongAnswers}/${totalQuestions} questions`;
    
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

function rateUs() {
    alert('Thank you for your feedback!');
}

