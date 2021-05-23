class adCollection {
    _adList = [];
    constructor(adList = []) {
        this.addAll(adList);
    }
    getPage(skip = 0, top = 10, filterConfig = null) {
        if(typeof skip !== "number" || typeof top !== "number" || typeof filterConfig !== "object"){
            return false;
        }
        let result = [];
        if (!filterConfig) {
            result = this._adList.slice(skip, skip + top);
        } else {
            for (let i = 0; i < this._adList.length; i++) {
                if ((filterConfig.fromDate === undefined || this._adList[i].createdAt >= filterConfig.fromDate)
                    && (filterConfig.toDate === undefined || this._adList[i].createdAt <= filterConfig.toDate)
                    && (filterConfig.vendor === undefined || this._adList[i].vendor === filterConfig.vendor)) {

                    if (filterConfig.tags.
                            every(tagNeed =>
                                this._adList[i].hashTags.find(tag => tag === tagNeed) !== undefined)) {
                        result.push(this._adList[i]);
                    }
                }

            }
        }
        return result.slice(skip, skip + top);
    }

    get(idFind) {
        if(typeof idFind !== "string"){
            return err;
        }
        return this._adList.find(item => item.id === idFind);
    }

    add(adItem) {
        if(typeof adItem !== "object"){
            return err;
        }
        if (AdList._validateAd(adItem) &&
                this._adList.find(item => item.id === adItem.id && item !== adItem) === undefined) {
            this._adList.push(adItem);
            return true;
        } else {
            return false;
        }
    }

    addAll(adList){
        if(!(Array.isArray(adList))){
            return false;
        }
        let incorrectItem = [];
        adList.forEach(value =>  this.add(value)? true : incorrectItem.push(value));
        return incorrectItem;
    }

    edit(id, adItem) {
        if(typeof id !== "string" || typeof adItem !== "object"){
            return "Incorrect parametrs";
            return false;
        }
        let editableItem = this.get(id);
        const resultItem = Object.assign(editableItem, adItem);
        if (AdList._validateAd(resultItem)) {
            editableItem = resultItem;
            return true;
        } else {
            return false;
        }
    }

    remove(id) {
        if(typeof id !== "string"){
            return err;
        }
        const index = this._adList.findIndex(value => value.id === id);
        if (index !== -1) {
            this._adList.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }

    clear(){
        this._adList.splice(0, this._adList.length);
    }

    static _validateAd(adItem) {
        if(typeof adItem !== "object"){
            return err;
        }
       return adItem.id !== undefined && typeof adItem.id == "string"
            && adItem.description !== undefined && typeof adItem.description == "string"
            && adItem.description.length < 200
            && adItem.createdAt !== undefined && adItem.createdAt instanceof Date
            && adItem.link !== undefined && typeof adItem.link == "string"
            && adItem.vendor !== undefined && typeof adItem.vendor == "string"
            && adItem.vendor.trim() !== ""
            && adItem.hashTags !== undefined && Array.isArray(adItem.hashTags)
            && adItem.discount !== undefined && typeof adItem.discount == "string"
            && adItem.validUntil !== undefined && adItem.createdAt instanceof Date;
    }
}

class User{
    constructor(name, isLoggedIn){
        this._name = name;
        this._isLoggedIn = isLoggedIn;
    }
}

class View{
    constructor(user, adCollection){
        this._user = user;
        this._adCollection = adCollection
    }

    formatDate(date) {
        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
    
        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
    
        let yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;
    
        return dd + '.' + mm + '.' + yy;
      }


    logIn(){
        this.createHeader(user);
        this.showAds();
    }


    showAds(skip = 0, top = 10, filter = {}){
       let buttons = '';
       if(this._user._isLoggedIn){
           buttons = '<i class="far fa-file-alt fa-3x"></i>'
       } 
       const products = document.getElementsByClassName("product")[0];
       products.innerHTML = '';

       let itemCollection = [];

       this._adCollection.getPage(skip,top,filter).forEach(
           elem =>{
               const adItem = document.createElement('div');
               adItem.classList.add('product__item');

               let reviewsText = "";
               elem.reviews.slice(2).forEach(
                   review => {
                       reviewsText += `<li>${review}</li>`;
                   }
               )

               let hashTagsText = "";
               elem.hashTags.forEach(
                hashTag => {
                    hashTagsText += `<a>\#${hashTag}</a>`;
                }
            )

            adItem.innerHTML =
            `
           <div class="left">
                    <img src="images/product.png" class="img-product" src=${elem.photoLink} alt="product">   
                    <p class="product-name">Название</p>
                    <p class="hash-tag">${hashTagsText}</p>
                    <p class="short-description">${elem.description}</p>
                    <p class="vendor" >${elem.vendor}</p><a href="link.html">Ссылка</a>
                    <div class="round-for-sale"><p>${elem.discount}</p>До<p<time>${this.formatDate(elem.validUntil)}</time></div>
                    <p class="comment">${reviewsText}</p>
                    <p class="comment">${reviewsText}</p>
                    <p class="comment">${reviewsText}</p>
                    <span class="span-color">&#9733;</span><span class="span-color">&#9733;</span><span class="span-color">&#9733;</span><span>&#9734;</span><span>&#9734;</span>
                    <button class="button-add-comment">Добавить комментарий</button>
            </div>
            `;
            itemCollection.push(adItem);
           }
       )

       itemCollection.sort((a,b) => {return b.createdAt - a.createdAt});

       itemCollection.forEach(elem => {
           products.appendChild(elem);
       })


    }

    removeAd(id){
        if(this._adCollection.remove(id)){
            this.showAds();
        }
    }

    editAd(id, changes){
        if(this._adCollection.edit(id,changes)){
            this.showAds();
        }
    }

    addAd(ad){
        if(this._adCollection.add(ad)){
            this.showAds();
        }
    }

    createHeader(){
        if(this._user._isLoggedIn){
            const headerUserName = document.getElementsByClassName("nav__username")[0];
            headerUserName.innerHTML = this._user._name;
        }else{
            const headerUserName = document.getElementsByClassName("nav__username")[0];
            headerUserName.innerHTML = " ";
            const headerButton = document.getElementsByClassName("nav__link")[0];
            headerButton.innerHTML = "sign in";
        }
    }
}

let adList = [

 {

   id: '1',
   description: 'Скидка на женский спортивный костюм -20%',
   createdAt: new Date('2021-03-16T23:00:00'),
   link: 'https://sisters.by/catalog/clothing/sportivnye-kostyumy/komplekt-20-24-2.html',
   vendor: 'Sisters',
   photoLink: 'https://sisters.by/_thumbs/items-product_page_item_mobile/icon-147870.jpg',
   validUntil: new Date('2021-04-16T23:00:00'),
   discount: '20%',
   hashTags: ['одежда'],
   rating: 5.0,
   reviews :[]

 },
{

   id: '2',
   description: 'Скидка на свитер -58%',
   createdAt: new Date('2021-03-01T23:00:00'),
   link: 'https://www.lamoda.by/p/by004ewllwn1/clothes-byswan-sviter/',
   vendor: 'lamoda',
   photoLink: 'https://a.lmcdn.ru/img600x866/B/Y/BY004EWLLWN1_12690724_2_v1_2x.jpg',
   validUntil: new Date('2021-03-24T23:00:00'),
   discount: '58%',
   hashTags: ['одежда'],
   rating: 4.6,
   reviews :[]

 },
 {

   id: '3',
   description: 'Скидка на блузку -40%',
   createdAt: new Date('2021-03-16T23:00:00'),
   link: 'https://sisters.by/catalog/clothing/bluzki-i-rubashki/bluzka-vit-21-1611x.html',
   vendor: 'Sisters',
   photoLink: 'https://sisters.by/_thumbs/items-product_page_item_mobile/icon-148023.jpg',
   validUntil: new Date('2021-04-16T23:00:00'),
   discount: '40%',
   hashTags: ['одежда'],
   rating: 3.0,
   reviews :[]

 },
 {

   id: '4',
   description: 'Скидка на стайлер POLARIS -45%',
   createdAt: new Date('2021-03-01T23:00:00'),
   link: 'https://sila.by/bt/stajlery/POLARIS/phs_2405k_',
   vendor: 'Электросила',
   photoLink: 'https://sila.by/img/catalog2015/bt/tovar70534.jpg',
   validUntil: new Date('2021-04-15T23:00:00'),
   discount: '45%',
   hashTags: ['техника'],
   rating: 4.0,
   reviews :[]

 },
 {

   id: '5',
   description: 'Скидка на вытяжку BOSCH -20%',
   createdAt: new Date('2021-02-27T23:00:00'),
   link: 'https://sila.by/vt/vytyazhki/BOSCH/dhi642eq',
   vendor: 'Электросила',
   photoLink: 'https://sila.by/img/catalog2015/vt/tovar69256.jpg',
   validUntil: new Date('2021-03-31T23:00:00'),
   discount: '20%',
   hashTags: ['техника'],
   rating: 3.0,
   reviews :[]

 },
 {

   id: '6',
   description: 'Скидка на книгу "Взламывая мозг" -7%',
   createdAt: new Date('2021-03-01T23:00:00'),
   link: 'https://oz.by/books/more10976092.html',
   vendor: 'OZ',
   photoLink: 'https://s2-goods.ozstatic.by/2000/92/976/10/10976092_0.jpg',
   validUntil: new Date('2021-03-30T23:00:00'),
   discount: '7%',
   hashTags: ['книга'],
   rating: 0.0,
   reviews :[]

 },
 {

   id: '7',
   description: 'Скидка на книгу "Метро 2033" -20%',
   createdAt: new Date('2021-03-15T23:00:00'),
   link: 'https://oz.by/books/more10796109.html',
   vendor: 'OZ',
   photoLink: 'https://s5-goods.ozstatic.by/2000/109/796/10/10796109_0.jpg',
   validUntil: new Date('2021-04-28T23:00:00'),
   discount: '20%',
   hashTags: ['книга'],
   rating: 5.0,
   reviews :[]

 },
 {

   id: '8',
   description: 'Скидка на гель для душа -35%',
   createdAt: new Date('2021-03-15T23:00:00'),
   link: 'https://oz.by/showergels/more10843275.html',
   vendor: 'OZ',
   photoLink: 'https://s3-goods.ozstatic.by/2000/275/843/10/10843275_0.jpg',
   validUntil: new Date('2021-04-30T23:00:00'),
   discount: '35%',
   hashTags: ['косметика'],
   rating: 5.0,
   reviews :[]

 },
 {

   id: '9',
   description: 'Скидка на нож -15%',
   createdAt: new Date('2021-03-15T23:00:00'),
   link: 'https://oz.by/knives/more10967891.html',
   vendor: 'OZ',
   photoLink: 'https://s1-goods.ozstatic.by/2000/891/967/10/10967891_0.jpg',
   validUntil: new Date('2021-03-28T23:00:00'),
   discount: '15%',
   hashTags: ['посуда'],
   rating: 0.0,
   reviews :[]

 },
 {

   id: '10',
   description: 'Скидка на матрас -46%',
   createdAt: new Date('2021-03-03T23:00:00'),
   link: 'https://pinskdrev.by/catalog/tolko-onlayn/matrasyi-mayya---sale/',
   vendor: 'Пинскдрев',
   photoLink: 'https://pinskdrev.by/web/files/imagick_cache/w580h580t3/web/catalogfiles/catalog/products/66df0686cefd8923ece4c7c790b4dafa.jpg',
   validUntil: new Date('2021-06-15T23:00:00'),
   discount: '46%',
   hashTags: ['матрасы'],
   rating: 0.0,
   reviews :[]

 },
 {

   id: '11',
   description: 'Скидка на игру "Grand Theft Auto V" -58%',
   createdAt: new Date('2021-03-15T23:00:00'),
   link: 'https://hot-game.info/game/grand-theft-auto-5',
   vendor: 'Hot Games',
   photoLink: 'https://hot-game.info/uploads/media/game/0001/10/thumb_9474_game_poster.jpeg',
   validUntil: new Date('2021-08-30T23:00:00'),
   discount: '58%',
   hashTags: ['игры'],
   rating: 4.0,
   reviews :[]

 },
 {

   id: '12',
   description: 'Скидка на игру "Playerunknown Battlegrounds" -19%',
   createdAt: new Date('2021-03-15T23:00:00'),
   link: 'https://hot-game.info/game/Playerunknowns-Battlegrounds',
   vendor: 'Hot Games',
   photoLink: 'https://hot-game.info/uploads/media/game/0001/07/thumb_6545_game_poster2.jpeg',
   validUntil: new Date('2021-06-30T23:00:00'),
   discount: '19%',
   hashTags: ['игры'],
   rating: 4.0,
   reviews :[]

 },
 {

   id: '13',
   description: 'Скидка на игру "S.T.A.L.K.E.R.: Bundle" -90%',
   createdAt: new Date('2021-03-15T23:00:00'),
   link: 'https://hot-game.info/game/STALKER-Bundle',
   vendor: 'Hot Games',
   photoLink: 'https://hot-game.info/uploads/media/game/0001/34/thumb_33884_game_poster.jpeg',
   validUntil: new Date('2021-04-20T23:00:00'),
   discount: '90%',
   hashTags: ['игры'],
   rating: 5.0,
   reviews :[]

 },
 {

   id: '14',
   description: 'Скидка на мягкую игрушку -15%',
   createdAt: new Date('2021-03-15T23:00:00'),
   link: 'https://buslik.by/catalog/igrushki_i_igry/myagkie_igrushki/myagkie_zverushki/osminog_v_assort_malvina_15_141_1_6/',
   vendor: 'Буслик',
   photoLink: 'https://buslik.by/upload/slam.image/iblock/589/5899e80c097d5ba77cc6467364b6c6ce-90.jpg',
   validUntil: new Date('2021-04-23T23:00:00'),
   discount: '15%',
   hashTags: ['игрушки'],
   rating: 0.0,
   reviews :[]

 },
 {

   id: '15',
   description: 'Скидка на куклу -50%',
   createdAt: new Date('2021-03-15T23:00:00'),
   link: 'https://buslik.by/catalog/igrushki_i_igry/kukly_i_aksessuary/kukly_1/mini_kukly/kukla_dong_huan_big_tree_toys_12sm/',
   vendor: 'Буслик',
   photoLink: 'https://buslik.by/upload/slam.image/iblock/a86/a86cec311e22d4396acf8b86e9f5efec-90.jpg',
   validUntil: new Date('2021-05-10T23:00:00'),
   discount: '50%',
   hashTags: ['игрушки'],
   rating: 5.0,
   reviews :[]

 },
 {

   id: '16',
   description: 'Скидка на LEGO -15%',
   createdAt: new Date('2021-03-15T23:00:00'),
   link: 'https://buslik.by/catalog/igrushki_i_igry/konstruktory/lego/konstruktor_kosmicheskiy_robot_dlya_gornykh_rabot_327_detaley_lego_creator_31115/',
   vendor: 'Буслик',
   photoLink: 'https://buslik.by/upload/slam.image/iblock/ec4/ec4f0a6d7445e05aa2dd7bfb3a61306f-90.jpg',
   validUntil: new Date('2021-03-30T23:00:00'),
   discount: '15%',
   hashTags: ['игрушки'],
   rating: 5.0,
   reviews :[]

 },
 {

   id: '17',
   description: 'Скидка на витамины -50%',
   createdAt: new Date('2021-03-15T23:00:00'),
   link: 'https://www.iherb.com/pr/California-Gold-Nutrition-Andrographis-Immune-with-AP-BIO-100-mg-120-Tablets/101059',
   vendor: 'iHerb',
   photoLink: 'https://s3.images-iherb.com/cgn/cgn01819/v/10.jpg',
   validUntil: new Date('2021-04-15T23:00:00'),
   discount: '50%',
   hashTags: ['здоровье'],
   rating: 4.0,
   reviews :[]

 },
 {

   id: '18',
   description: 'Скидка на витамины -50%',
   createdAt: new Date('2021-03-15T23:00:00'),
   link: 'https://www.iherb.com/pr/Now-Foods-High-Potency-Vitamin-D-3-125-mcg-5-000-IU-120-Softgels/10421',
   vendor: 'iHerb',
   photoLink: 'https://s3.images-iherb.com/now/now00372/v/27.jpg',
   validUntil: new Date('2021-05-04T23:00:00'),
   discount: '50%',
   hashTags: ['здоровье'],
   rating: 5.0,
   reviews :[]

 },
 {

   id: '19',
   description: 'Скидка на женские джинсы -36%',
   createdAt: new Date('2021-03-15T23:00:00'),
   link: 'https://www.wildberries.ru/catalog/15537164/detail.aspx?targetUrl=BP',
   vendor: 'ТВОЕ',
   photoLink: 'https://images.wbstatic.net/c516x688/new/15530000/15537164-1.jpg',
   validUntil: new Date('2021-06-12T23:00:00'),
   discount: '36%',
   hashTags: ['одежда'],
   rating: 4.0,
   reviews :[]

 },
 {

   id: '20',
   description: 'Скидка на платье -12%',
   createdAt: new Date('2021-03-15T23:00:00'),
   link: 'https://www.wildberries.ru/catalog/19126078/detail.aspx?targetUrl=BP',
   vendor: 'ТВОЕ',
   photoLink: 'https://images.wbstatic.net/c516x688/new/19120000/19126078-1.jpg',
   validUntil: new Date('2021-03-25T23:00:00'),
   discount: '12%',
   hashTags: ['одежда'],
   rating: 5.0,
   reviews :[]

 },
 ]

 let adCollection = new AdCollection(adList)

const user = new User("test_user", true);

const viewer = new View(user, adCollection);

viewer.logIn();