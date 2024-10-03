import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  setCurrentSelectedAddress,
  addressInfo,
  selectedId,
  handleEditAddress,
  handleDeleteAddress,
}) {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer border-red-700 ${
        selectedId?._id === addressInfo?._id
          ? "border-red-900 border-[4px]"
          : "border-black"
      }`}
    >
      <CardContent className="grid p-4 gap-4">
        <Label>Endereço: {addressInfo?.address}</Label>
        <Label>Cidade: {addressInfo?.city}</Label>
        <Label>pincode: {addressInfo?.pincode}</Label>
        <Label>Telefone: {addressInfo?.phone}</Label>
        <Label>Notas: {addressInfo?.notes}</Label>
      </CardContent>

      <CardFooter className="p-3 flex justify-between">
        <Button onClick={() => handleEditAddress(addressInfo)}>Editar</Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)}>
          Deletar
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
