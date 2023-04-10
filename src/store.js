import { flush, getId } from "./Effectok/hooks"


export class Message{
    constructor(role, content){
        this.role = role  
        this.content = content
    }
    role = ''  //user  assistant
    content = ''
}

class Store {
    save(id, obj){
        window.localStorage.setItem(id,JSON.stringify(obj));
    }
    get(id){
        return JSON.parse(window.localStorage.getItem(id));
    }
    delete(id){
        if(localStorage.getItem(id) != null){
            localStorage.removeItem(id);
        }
    }
    constructor(){
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if(key === 'ally-supports-cache') continue;
            if(key === 'lastListId'){
                this.curListId = localStorage.getItem(key);
                this.changed.add(this.curListId);
            }
            this.map.set(key, this.get(key));
        }
    }
    map = new Map([])
    curListId = ''
    deleteList(listId){
        this.map.delete(listId);
        this.delete(listId);
    }
    getCurList(){
        // console.log('getCurList() == ' + this.curListId)
        return this.map.get(this.curListId);  
    }
    setCurList(listId){
        this.curListId = listId
        // console.log("setCurList == " + this.curListId)
    }
    addList(){
        let id = getId();
        this.curListId = id;
        let array = [];
        this.map.set(id, array)
        this.save(id, []);
        flush('leftBar');
        flush(`shower`);
    }
    addUserMessage(message){
        let curList;
        // console.log("curListId == " + this.curListId)
        if(this.curListId === ''){
            // console.log("222222222222")
            this.curListId = getId();
            curList = [];
            this.map.set(this.curListId, curList);
        } else {
            // console.log("1111111111");
            curList = this.getCurList();
        }
        // console.log(curList);
        curList.push({role: 'user', content: message});

        this.save(this.curListId, curList);

        flush('shower');
        flush('leftBar');
    }
    addAassistant(message){
        let curList = this.getCurList();
        //console.log(curList)
        curList.push({role: 'assistant', content: message});
        this.save(this.curListId, curList);
        flush('shower');
    }

    reName(id, newId){
        if(id === newId) return;
        this.save(newId, this.get(id));
        this.delete(id)
        if(this.curListId === id){
            this.curListId = newId;
        }
        flush('leftBar');
    }
}


let store = new Store;
export default store