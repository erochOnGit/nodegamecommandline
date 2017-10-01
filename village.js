/**
 * Created by emile on 30/09/2017.
 */
class Village {
    constructor(owner){
        this.character ="&#8719" ;
        this.owner = owner
        this.citizen = 0;
        this.mairie
    }
    getView(){
        return "citizen : "+this.citizen
    }
}
export default Village