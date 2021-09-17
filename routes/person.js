const { Router, response, request } = require('express')

const router = Router()

router.get("/", (req = request, res = response)=>{ 
    res.json({
        msg: 'Response from GET Method - Person '
    })
})

router.post("/", (req = request, res = response)=>{ 
    res.json({
        msg: 'Response from POST Method - Person '
    })
})

module.exports = router
