const { Router, request, response } = require('express')

const router = Router()

router.get("/", (req = request, res = response)=>{ 
    res.json({
        msg: 'Response from GET Method - Stats '
    })
})

router.post("/", (req = request, res = response)=>{ 
    res.json({
        msg: 'Response from POST Method - Stats '
    })
})

module.exports = router