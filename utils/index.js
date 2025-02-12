function getRandomSuccessProbability() {
    return Math.floor(Math.random() * 100) + 1;
}

function generateCodename() {
    const codenames = [
        "The Nightingale",
        "The Kraken",
        "The Phantom",
        "The Serpent",
    ];
    return codenames[Math.floor(Math.random() * codenames.length)];
}

module.exports = { getRandomSuccessProbability, generateCodename };
