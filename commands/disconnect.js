exports.run = async (client, message) => {
    client.distube.voices.leave(message);
}