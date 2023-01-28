
function useFetch(word) {

    const getRelatedWords = async() => {
        const response = await fetch(`https://api.datamuse.com/words?ml=${word}`);
        const data = await response.json();
        const slicedArray = data.slice(0, 5);

        return slicedArray
    }

    const get_data = getRelatedWords()

    return get_data
}

export default useFetch