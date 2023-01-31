import { useDispatch, useSelector } from 'react-redux';

function RandomWords_50() {
    const Random_Words = useSelector(state => {
        return state.Random_Words.map(word => {
            if (word.random_value > 50){
            return word
            }
        }).filter(word => word != null)
    })

    return Random_Words
}

function RandomWords_40() {
    const Random_Words = useSelector(state => {
        return state.Random_Words.map(word => {
            if (word.random_value > 40){
            return word
            }
        }).filter(word => word != null)
    })

    return Random_Words
}

function RandomWords_30() {
    const Random_Words = useSelector(state => {
        return state.Random_Words.map(word => {
            if (word.random_value > 30){
            return word
            }
        }).filter(word => word != null)
    })

    return Random_Words
}
function RandomWords_20() {
    const Random_Words = useSelector(state => {
        return state.Random_Words.map(word => {
            if (word.random_value > 20){
            return word
            }
        }).filter(word => word != null)
    })

    return Random_Words
}
function RandomWords_10() {
    const Random_Words = useSelector(state => {
        return state.Random_Words.map(word => {
            if (word.random_value > 10){
            return word
            }
        }).filter(word => word != null)
    })

    return Random_Words
}

export default function useRandomWords() {
    const a = RandomWords_50()
    const b = RandomWords_40()
    const c = RandomWords_30()
    const d = RandomWords_20()
    const e = RandomWords_10()

    if (a.length > 3){
        console.log('a: ' + a.length)
        return a
    }else if (b.length > 3){
        console.log('b: ' + b.length)
        return b
    }else if (c.length > 3){
        console.log('c: ' + c.length)
        return c
    }else if (d.length > 3){
        console.log('d: ' + d.length)
        return d
    }else if (e.length > 3){
        console.log('e: ' + e.length)
        return e
    }
}