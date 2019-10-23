function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function getAvatarUrl(userId) {
    var imageId = (userId % 5) + 1;
    return '/images/' + imageId + '.png';
}

module.exports = {
    capitalizeFirstLetter: capitalizeFirstLetter,
    getAvatarUrl: getAvatarUrl
}