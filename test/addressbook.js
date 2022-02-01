const AddressBook = artifacts.require("AddressBook");

contract("AddressBook", async (accounts) => {
  beforeEach(async () => {
    contract = await AddressBook.new();
  });
  it("AddAddresses function", async () => {
    let ArrayTest = [];
    ArrayTest.push(accounts[1], accounts[2]);
    await contract.AddAddress(accounts[1], "Book1");
    await contract.AddAddress(accounts[2], "Book2");
    const ArrayOfAddress = await contract.getAddressArray(accounts[0]);
    const NameOfBook = await contract.getNameBook(accounts[0], accounts[2]);
    expect(ArrayOfAddress).to.eql(ArrayTest);
    expect(NameOfBook).to.equal("Book2");
  });
  it("Remove address function", async()=>{
    let ArrayTest = [];
    ArrayTest.push(accounts[2]);
    await contract.AddAddress(accounts[1], "Book1");
    await contract.AddAddress(accounts[2], "Book2");
    await contract.removeAddress(accounts[1]);
    const ArrayOfAddress = await contract.getAddressArray(accounts[0]);
    const NameOfBook = await contract.getNameBook(accounts[0], accounts[1]);
    expect(ArrayOfAddress).to.eql(ArrayTest);
    expect(NameOfBook).to.equal('');
  })
});
