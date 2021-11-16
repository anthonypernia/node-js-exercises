import { CartService } from '../service/cartService';
import { ProductsService } from '../../products/service/productsService'

class CartController {

    static  async createCart( req, res, next ){
        try{
            let id = await CartService.createCart();
            res.status(200).json({id});
        }catch(err){
            res.status(500).json({error: err});
        }
    }

    static  async  deleteCart(req, res, next){
        try{
            let cartId = parseInt(req.params.id);
            let response = await CartService.deleteCart(cartId);
            if (response) {
                res.status(200).json({result:"Complete"});
            }else{
                res.status(404).json({error: "Cart not found"});
            }
        }catch(err){
            res.status(500).json({error: err});
        }
    }

    static  async  getCartProducts(req, res, next ){
        try{
            let cartId = parseInt(req.params.id);
            let products =  await CartService.getCartProducts(cartId)
            if (products) {
                res.status(200).json({products});
            }else{
                res.status(404).json({error: "Cart not found"});
            }
        }catch(err){
            res.status(500).json({error: err});
        }
    }

    static  async  addProductToCart(req, res, next){
        try{
            let cartId = parseInt(req.params.id);
            let productId = parseInt(req.body.id);
            let response =  await CartService.addProductToCart(cartId, productId);
            if (response) {
                res.status(200).json({result:"Complete"});
            }else{
                res.status(404).json({error: "Cart not found"});
            }
        }catch(err){
            res.status(500).json({error: err});
        }
    }

    static  async  removeProductFromCart(req, res, next ){
        try{
            let cartId = parseInt(req.params.id);
            let productId = parseInt(req.params.id_prod);
            let response =  await CartService.removeProductFromCart(cartId, productId);
            if (response==1) {
                res.status(200).json({result:"Complete"});
            }else if(response==-1){
                res.status(404).json({error: "Product not found"});
            }else{
                res.status(404).json({error: "Cart not found"});
            }
        }catch(err){
            res.status(500).json({error: err});
        }
    }

    static  async saveCartFile(req, res, next ) {
        try{
            let cartId = parseInt(req.params.id);
            let response = await CartService.saveCartFile(cartId);
            if (response) {
                res.status(200).json({result:"Complete"});
            }else{
                res.status(404).json({error: "Cart not found"});
            }
        }catch(err){
            res.status(500).json({error: err});
        }
    }

}

export { CartController };