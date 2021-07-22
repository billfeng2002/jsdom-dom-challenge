let time=0
let paused=false
function updateTime(){
    
    let display=document.querySelector('#counter')
    display.innerHTML=time
}
let timer = setInterval(increment, 1000)

function addLike(){
    console.log("doin stuff")
    let likeElement=document.querySelector(`li[data-id="${time}"]`)
    let timesLiked=0
    if(likeElement==null){
        likeElement=document.createElement('li')
        likeElement.dataset.id=time
    }else{
        let contents=likeElement.innerHTML.split(" ")
        timesLiked=parseInt(contents[contents.length-2])
        //debugger
    }
    timesLiked++
    likeElement.innerHTML=`${time} has been liked ${timesLiked} times`
    let likes=document.querySelector("ul.likes")
    likes.append(likeElement)
}

function increment(){
    if(!paused){
        time+=1
    }
    updateTime()
}

function decrement(){
    if(!paused){
        time-=1
    }
    updateTime()
}

let heartButton=document.querySelector("#heart")
heartButton.addEventListener("click", addLike)

let incrementButton=document.querySelector("#plus")
incrementButton.addEventListener("click", increment)

let decrementButton=document.querySelector("#minus")
decrementButton.addEventListener("click", decrement)
document.addEventListener("click", ()=>console.log("click"))

let pauseButton=document.querySelector("#pause")

function pauseAction(){
    if(paused){
        timer=setInterval(increment, 1000)
        paused=false
        pauseButton.innerHTML="pause"
        incrementButton.disabled=false
        heartButton.disabled=false
        decrementButton.disabled=false
    }else{
        clearInterval(timer)
        paused=true
        pauseButton.innerHTML="resume"
        
        incrementButton.disabled=true
        heartButton.disabled=true
        decrementButton.disabled=true
    }
}
pauseButton.addEventListener("click", pauseAction)

function restart(){
    time=0
    clearInterval(timer)
    timer=setInterval(increment, 1000)
    paused=false
    pauseButton.innerHTML="pause"
    incrementButton.disabled=false
    heartButton.disabled=false
    decrementButton.disabled=false
    updateTime()
}
let resetButton=document.createElement("button")
resetButton.id='reset'
resetButton.innerHTML="reset"
document.body.append(resetButton)
resetButton.addEventListener("click", restart)

function addComment(event){
    event.preventDefault()
    let commentElement=document.createElement("p")
    commentElement.innerHTML=event.target.comment.value
    let comments = document.querySelector("#list")
    comments.append(commentElement)
}

let form=document.querySelector("#comment-form")
form.addEventListener("submit", addComment)