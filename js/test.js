
let countdown = 10
const timer = setInterval(()=> {

    countdown--

    console.log(countdown)

    if(countdown <= 0 + 1){

        clearInterval(timer)

        console.log('✅ Checked!')
    }
},1000)