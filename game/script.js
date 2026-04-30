const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
const bubbleColors = ['#7ef7ff', '#ffd97a', '#b8f9ff', '#fff0b8'];
let bubbleIndex = 0;

function setCursorVisible(visible) {
    const value = visible ? 'visible' : 'hidden';
    cursorDot.style.visibility = value;
    cursorRing.style.visibility = value;
}

setCursorVisible(false);

document.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;
    setCursorVisible(true);
    cursorDot.style.left = clientX + 'px';
    cursorDot.style.top = clientY + 'px';
    cursorRing.style.left = clientX + 'px';
    cursorRing.style.top = clientY + 'px';
});

document.addEventListener('mouseenter', () => setCursorVisible(true));
document.addEventListener('mouseleave', () => setCursorVisible(false));
window.addEventListener('blur', () => setCursorVisible(false));

document.addEventListener('mousedown', () => cursorRing.classList.add('active'));
document.addEventListener('mouseup', () => cursorRing.classList.remove('active'));

document.addEventListener('click', (event) => {
    const count = 4;
    for (let i = 0; i < count; i++) {
        const bubble = document.createElement('span');
        bubble.className = 'bubble' + (i % 2 ? ' large' : '');
        const angle = (Math.PI * 2 * i) / count;
        const radius = 8 + i * 4;
        bubble.style.left = event.clientX + Math.cos(angle) * radius + 'px';
        bubble.style.top = event.clientY + Math.sin(angle) * radius + 'px';
        bubble.style.color = bubbleColors[(bubbleIndex + i) % bubbleColors.length];
        document.body.appendChild(bubble);
        setTimeout(() => bubble.remove(), 760);
    }
    bubbleIndex = (bubbleIndex + 1) % bubbleColors.length;
});

document.querySelectorAll('a, button').forEach((el) => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('active'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('active'));
});
