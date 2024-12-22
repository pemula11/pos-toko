const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;
const productController = require('../controllers/productController');
const productService = require('../services/productServices');
const { v4: uuidv4 } = require('uuid');



describe('productController', () => {

    let findAllDataStub;
    let countDataStub;
    let findDataStub;
    let addDataStub;
    let updateDataStub;
    let deleteDataStub;

    beforeEach(() => {
        findAllDataStub = sinon.stub(productService, 'findAllData');
        countDataStub = sinon.stub(productService, 'countData');
        findDataStub = sinon.stub(productService, 'findOne');
        addDataStub = sinon.stub(productService, 'create');
        updateDataStub = sinon.stub(productService, 'update');
        deleteDataStub = sinon.stub(productService, 'delete');
    });

    afterEach(() => {
        findAllDataStub.restore();
        countDataStub.restore();
        findDataStub.restore();
        addDataStub.restore();
        updateDataStub.restore();
        deleteDataStub.restore();
    });

    describe('getProducts', () => {
        it('should return paginated products', async () => {
            const req = {
                query: {
                    page: '1',
                    limit: '5'
                }
            };
            const res = {
                json: sinon.spy()
            };
            const next = sinon.spy();

            const products = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
            const total = 2;

            findAllDataStub.resolves(products);
            countDataStub.resolves(total);

            await productController.getProducts(req, res, next);
         
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.firstCall.args[0]).to.deep.equal({
                status: 'success',
                data: {
                    data: products,
                    page: 1,
                    limit: 5,
                    total: total,
                    pages: 1
                }
            });

    
        });

        it('should return paginated products with default values', async () => {
            const req = {
                query: {}
            };
            const res = {
                json: sinon.spy()
            };
            const next = sinon.spy();

            const products = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
            const total = 2;

            findAllDataStub.resolves(products);
            countDataStub.resolves(total);

            await productController.getProducts(req, res, next);
         
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.firstCall.args[0]).to.deep.equal({
                status: 'success',
                data: {
                    data: products,
                    page: 1,
                    limit: 10,
                    total: total,
                    pages: 1
                }
            });

        });
        
    });

    describe('getProduct', () => {
        it('should return a product', async () => {
            const idProduct = uuidv4();
            const req = {
                params: {
                    id: idProduct
                }
            };
            const res = {
                json: sinon.spy()
            };
            const next = sinon.spy();

            const product = { id: idProduct, name: 'Product 1' };

            findDataStub.resolves(product);

            await productController.getProduct(req, res, next);
         
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.firstCall.args[0]).to.deep.equal({
                status: 'success',
                data: product
            });

        });

        it('should return 404 if product is not found', async () => {
            const idProduct = uuidv4();
            const req = {
                params: {
                    id: idProduct
                }
            };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.spy()
            };
            const next = sinon.spy();

            findDataStub.resolves(null);

            await productController.getProduct(req, res, next);

            expect(res.status.calledOnce).to.be.true;
            expect(res.status.firstCall.args[0]).to.equal(404);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.firstCall.args[0]).to.deep.equal({
                status: 'error',
                message: 'Product not found'
            });
        });

  
    });

    describe('addProduct', () => {
        it('should success add product', async () => {
            const req = {
                body: {
                    name: 'Product 1',
                    category: 'Category 1',
                    price: 1000
                }
            }

            const res = {
                json: sinon.spy()
            }

            const next = sinon.spy();

            const product = {
                name: 'Product 1',
                category: 'Category 1',
                price: 1000
            }

            addDataStub.resolves(product);

            await productController.addProduct(req, res, next);

            expect(res.json.calledOnce).to.be.true;
            expect(res.json.firstCall.args[0]).to.deep.equal({
                status: 'success',
                data: product
            });
        });


        it('should return 400 if name is not provided', async () => {
            const req = {
                body: {
                    category: 'Category 1',
                    price: 1000
                }
            }

            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.spy()
            };
            const next = sinon.spy();

            await productController.addProduct(req, res, next);

            expect(res.status.calledOnce).to.be.true;
            expect(res.status.firstCall.args[0]).to.equal(400);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.firstCall.args[0]).to.deep.equal({
                status: 'error',
                message: [
                    {
                        "actual": undefined,
                        type: "required",
                        message: "The 'name' field is required.",
                        field: "name"
                    }
                ]
            });

        } );

    });

    describe('updateProduct', () => {
        it('shpuld update product', async () => {
            const idProduct = uuidv4();
            const req = {
                params: {
                    id: idProduct
                },
                body: {
                    name: 'Product 1',
                    category: 'Category 1',
                    price: 1000
                }
            }

            const res = {
                json: sinon.spy()
            }

            const next = sinon.spy();

            const product = {
                name: 'Product 1',
                category: 'Category 1',
                price: 1000
            }

            updateDataStub.resolves(product);

            await productController.updateProduct(req, res, next);

            expect(res.json.calledOnce).to.be.true;
            expect(res.json.firstCall.args[0]).to.deep.equal({
                status: 'success',
                data: product
            });
        
       });
    });


    describe('deleteProduct', () => {
        it('should delete product', async () => {
            const idProduct = uuidv4();
            const req = {
                params: {
                    id: idProduct
                }
            };
            const res = {
                json: sinon.spy()
            };
            const next = sinon.spy();
    
            const product = { id: idProduct, name: 'Product 1' };
    
            deleteDataStub.resolves(product);
    
            await productController.deleteProduct(req, res, next);
         
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.firstCall.args[0]).to.deep.equal({
                status: 'success',
                message: 'product deleted'
            });
        });
    });


});