function View() {
}

View.prototype = {
    getButtons: () => {
        let btnList = document.getElementsByTagName('button');
        return btnList;
    }
};
