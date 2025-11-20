window.addEventListener('popstate', (e) => {
    console.log('state:', e.state);
});

function addHistory(){
    const state = {page: Date.now()};
    history.pushState(state, `Page ${state.page}`, `t=${state.page}`);
    console.log('Добавлена новая страница в историю: ', state);
}