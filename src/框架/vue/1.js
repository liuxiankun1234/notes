render({
    id: '#app',
    data() {
        return {
            name: 'name'
        }
    }
})

function render({id, dataFunc}) {
    const listenerData = dataFunc();
    console.log(listenerData)
}