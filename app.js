const content = document.querySelector('.content');
const form = document.querySelector('.form');
const submit = document.querySelector('#submit');
const letter = document.querySelector('#letter');
const wordElement = document.querySelector('#word');
const guessedElement = document.querySelector('#guessed');
const guessesLeftElement = document.querySelector('#guesses');
const hangImage = document.querySelector('#img')
localStorage.clear()

const words = ['abruptly', 'absurd', 'abyss', 'affix', 'askew', 'avenue', 'awkward', 'axiom', 'azure', 'bagpipes', 'bandwagon', 'banjo', 'bayou', 'beekeeper', 'bikini', 'blitz', 'blizzard', 'boggle', 'bookworm', 'boxcar', 'boxful', 'buckaroo', 'buffalo', 'buffoon', 'buxom', 'buzzard', 'buzzing', 'buzzwords', 'caliph', 'cobweb', 'cockiness', 'croquet', 'crypt', 'curacao', 'cycle', 'daiquiri', 'dirndl', 'disavow', 'dizzying', 'duplex', 'dwarves', 'embezzle', 'equip', 'espionage', 'euouae', 'exodus', 'faking', 'fishhook', 'fixable', 'fjord', 'flapjack', 'flopping', 'fluffiness', 'flyby', 'foxglove', 'frazzled', 'frizzled', 'fuchsia', 'funny', 'gabby', 'galaxy', 'galvanize', 'gazebo', 'giaour', 'gizmo', 'glowworm', 'glyph', 'gnarly', 'gnostic', 'gossip', 'grogginess', 'haiku', 'haphazard', 'hyphen', 'iatrogenic', 'icebox', 'injury', 'ivory', 'ivy', 'jackpot', 'jaundice', 'jawbreaker', 'jaywalk', 'jazziest', 'jazzy', 'jelly', 'jigsaw', 'jinx', 'jiujitsu', 'jockey', 'jogging', 'joking', 'jovial', 'joyful', 'juicy', 'jukebox', 'jumbo', 'kayak', 'kazoo', 'keyhole', 'khaki', 'kilobyte', 'kiosk', 'kitsch', 'kiwifruit', 'klutz', 'knapsack', 'larynx', 'lengths', 'lucky', 'luxury', 'lymph', 'marquis', 'matrix', 'megahertz', 'microwave', 'mnemonic', 'mystify', 'naphtha', 'nightclub', 'nowadays', 'numbskull', 'nymph', 'onyx', 'ovary', 'oxidize', 'oxygen', 'pajama', 'peekaboo', 'phlegm', 'pixel', 'pizazz', 'pneumonia', 'polka', 'pshaw', 'psyche', 'puppy', 'puzzling', 'quartz', 'queue', 'quips', 'quixotic', 'quiz', 'quizzes', 'quorum', 'razzmatazz', 'rhubarb', 'rhythm', 'rickshaw', 'schnapps', 'scratch', 'shiv', 'snazzy', 'sphinx', 'spritz', 'squawk', 'staff', 'strength', 'strengths', 'stretch', 'stronghold', 'stymied', 'subway', 'swivel', 'syndrome', 'thriftless', 'thumbscrew', 'topaz', 'transcript', 'transgress', 'transplant', 'triphthong', 'twelfth', 'twelfths', 'unknown', 'unworthy', 'unzip', 'uptown', 'vaporize', 'vixen', 'vodka', 'voodoo', 'vortex', 'voyeurism', 'walkway', 'waltz', 'wave', 'wavy', 'waxy', 'wellspring', 'wheezy', 'whiskey', 'whizzing', 'whomever', 'wimpy', 'witchcraft', 'wizard', 'woozy', 'wristwatch', 'wyvern', 'xylophone', 'yachtsman', 'yippee', 'yoked', 'youthful', 'yummy', 'zephyr', 'zigzag', 'zigzagging', 'zilch', 'zipper', 'zodiac', 'zombie']
const word = words[Math.floor(Math.random() * words.length)];
localStorage.setItem('word', word)

const regex = new RegExp('^[a-zA-Z]{1}$');
const guessed = [];
let currentGuesses = 6;
guessesLeftElement.innerHTML = `Guesses Left: ${currentGuesses}`;
guessedElement.innerHTML = `Guessed Letters: ${guessed.join(', ')}`;

function displayMessage(message, type) {
    content.classList.add(type);
    content.innerHTML = message;
    letter.disabled = true; submit.disabled = true;
    setTimeout(() => {
        content.classList.remove(type);
        content.innerHTML = '';
        if (currentGuesses <= 0) {
            localStorage.setItem('type', 'Lost')
            location.href = 'ending.html';
        }
        else if (!wordElement.innerHTML.includes('-')) {
            localStorage.setItem('type', 'Won')
            location.href = 'ending.html';
        }
        letter.disabled = false; submit.disabled = false;
    }, 1500)
}

function toDashes(word) {
    wordElement.innerHTML = '-'.repeat(word.length);
}

function getIndex(letter, word) {
    const indexes = [];
    for (let x = 0; x < word.length; x++) {
        if (word[x] === letter) {
            indexes.push(x)
        }
    }
    return indexes
}

function convertIndex(indexes, letter, word) {
    word = word.split('')
    for (let i of indexes) {
        word[i] = letter
    }
    wordElement.innerHTML = word.join('')
}

submit.addEventListener('click', (e) => {
    e.preventDefault();
    let l = letter.value;
    if (!regex.test(l)) {
        displayMessage('Input must be 1 letter.', 'error');
    }
    else {
        if (guessed.includes(l.toUpperCase())) {
            displayMessage('You have already guessed this letter.', 'error')
        }
        else {
            if (word.includes(l.toLowerCase())) {
                displayMessage(`${l} is in the word.`, 'info');
                convertIndex(getIndex(l.toLowerCase(), word), l.toLowerCase(), wordElement.innerHTML)
            }
            else {
                currentGuesses -= 1;
                guessesLeftElement.innerHTML = `Guesses Left: ${currentGuesses}`;
                hangImage.src = `Imgs/hangman${currentGuesses}.png`;
                displayMessage(`${l} is not in the word.`, 'error');
            }
            guessed.push(l.toUpperCase())
            guessedElement.innerHTML = `Guessed Letters: ${guessed.join(', ')}`;
        }
    }
    letter.value = '';
});

toDashes(word)
