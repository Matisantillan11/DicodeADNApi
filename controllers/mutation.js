const postMutation = (req = request, res = response) => {
	res.json({
		msg: 'Response from POST Method - Mutation ',
	})
}

module.exports = {
	postMutation,
}
