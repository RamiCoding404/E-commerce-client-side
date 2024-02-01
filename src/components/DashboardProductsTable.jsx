import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Image,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  Textarea,
  Flex,
  Select,
} from "@chakra-ui/react";
import {
  useCreateDashboardProductsMutation,
  useDeleteDashboardProductsMutation,
  useGetCategoriesQuery,
  useGetDashboardProductsQuery,
  useUpdateDashboardProductsMutation,
} from "../app/services/products";
import TableSkeleton from "./DashboardProductsTableSkeleton";
import { AiOutlineEye } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import CustomAlertDialog from "../shared/AlertDialog";
import { useEffect, useState } from "react";
import CustomModal from "../shared/Modal";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import { selectnetwork } from "../app/features/networkSlice";

const DashboardProductsTable = () => {
  const { isOnline } = useSelector(selectnetwork);
  const [clickProductId, setClickProductId] = useState(null);
  const [productToEdit, setproductToEdit] = useState(null);
  const [productToCreate, setProductToCreate] = useState({
    title: "",
    description: "",
  });
  const [Thumbnail, setThumbnail] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const {
    isOpen: isCreateModalOpen,
    onOpen: onCreateModalOpen,
    onClose: onCreateModalClose,
  } = useDisclosure();

  const { isLoading, data } = useGetDashboardProductsQuery({ page: 1 });
  const [destroyProduct, { isLoading: isDestroying, isSuccess }] =
    useDeleteDashboardProductsMutation();
  const [
    updateProduct,
    { isLoading: isUpdating, isSuccess: isUpdatingSuccess },
  ] = useUpdateDashboardProductsMutation();

  const [
    createProduct,
    { isLoading: isCreating, isSuccess: isCreatingSuccess },
  ] = useCreateDashboardProductsMutation();
  //get category
  const { data: categoriesData } = useGetCategoriesQuery();

  useEffect(() => {
    if (isSuccess) {
      setClickProductId(null);
      onClose();
    }

    if (isUpdatingSuccess) {
      setClickProductId(null);
      onModalClose();
    }

    if (isCreatingSuccess) {
      onCreateModalClose();
    }
  }, [
    isSuccess,
    onClose,
    onModalClose,
    isUpdatingSuccess,
    isCreatingSuccess,
    onCreateModalClose,
  ]);

  //Edit---------------------
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setproductToEdit({
      ...productToEdit,
      [name]: value,
    });
  };

  const onChangePriceHandler = (value) => {
    setproductToEdit({
      ...productToEdit,
      price: +value,
    });
  };
  const onChangeStockHandler = (value) => {
    setproductToEdit({
      ...productToEdit,
      stock: +value,
    });
  };

  const handledesChange = (e) => {
    const { name, value } = e.target;
    setproductToEdit({
      ...productToEdit,
      [name]: value,
    });
  };

  const onChangeThumbnailHandler = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const onSubmitHandler = () => {
    //3ashan na3l submit lel data baikon gwa formdata
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: productToEdit.title,
        description: productToEdit.description,
        price: productToEdit.price,
        stock: productToEdit.stock,
      })
    );
    //dah bai5tlf 7asb aly hast8al ma3ah dah mast5dmo tab3 strapi
    formData.append("files.thumbnail", Thumbnail);
    //-----------
    updateProduct({ id: clickProductId, body: formData });
  };

  //create-------------
  const onSubmitCreateHandler = () => {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: productToCreate.title,
        description: productToCreate.description,
        price: productToCreate.price,
        stock: productToCreate.stock,
        category: productToCreate.category,
      })
    );
    formData.append("files.thumbnail", Thumbnail);
    createProduct(formData);
  };

  const onChangeCreateHandler = (e) => {
    const { name, value } = e.target;

    setProductToCreate({
      ...productToCreate,
      [name]: value,
    });
  };
  const onChangePriceCreateHandler = (value) =>
    setProductToCreate({
      ...productToCreate,
      price: +value,
    });

  const onChangeStockCreateHandler = (value) =>
    setProductToCreate({
      ...productToCreate,
      stock: +value,
    });

  if (isLoading || !isOnline) return <TableSkeleton />;
  return (
    <>
      <Flex direction={"column"} maxW="85%" mx={"auto"} my={6}>
        <Button
          rightIcon={<AiOutlinePlus />}
          colorScheme="green"
          onClick={() => {
            onCreateModalOpen();
          }}
          ml={"auto"}
          w={"fit-content"}
        >
          Create
        </Button>
        <TableContainer maxW={"85%"} mx={"auto"}>
          <Table variant="simple">
            <TableCaption>
              Total Entries: {data?.data?.length ?? 0}
            </TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Thumbnail</Th>
                <Th isNumeric>Price</Th>
                <Th isNumeric>Stock</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.data?.map((product) => (
                <Tr key={product.id}>
                  <Td>{product?.id}</Td>
                  <Td>{product?.attributes?.title}</Td>
                  <Td>
                    {product?.attributes?.category?.data?.attributes?.title ??
                      "N/A"}
                  </Td>
                  <Td>
                    <Image
                      borderRadius="full"
                      objectFit={"cover"}
                      boxSize="50px"
                      src={
                        product?.attributes?.thumbnail?.data?.attributes
                          ?.formats?.thumbnail?.url
                      }
                      alt={product?.attributes?.title}
                    />
                  </Td>
                  <Td isNumeric>${product?.attributes?.price}</Td>
                  <Td isNumeric>{product?.attributes?.stock}</Td>
                  <Td>
                    <Button
                      as={Link}
                      to={`/products/${product.id}`}
                      colorScheme="purple"
                      variant="solid"
                      mr={3}
                      onClick={() => {}}
                    >
                      <AiOutlineEye size={17} />
                    </Button>
                    <Button
                      colorScheme="red"
                      variant="solid"
                      mr={3}
                      onClick={() => {
                        onOpen(), setClickProductId(product.id);
                      }}
                    >
                      <BsTrash size={17} />
                    </Button>
                    <Button
                      colorScheme="blue"
                      variant="solid"
                      onClick={() => {
                        onModalOpen(),
                          setproductToEdit(product.attributes),
                          setClickProductId(product.id);
                      }}
                    >
                      <FiEdit2 size={17} />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>ID</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Thumbnail</Th>
                <Th isNumeric>Price</Th>
                <Th isNumeric>Stock</Th>
                <Th>Action</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Flex>

      <CustomAlertDialog
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        title={"Are you sure"}
        description={"Do you really want to delete ?"}
        okTxt="Delete"
        variant="solid"
        isLoading={isDestroying}
        onOkHandler={() => destroyProduct(clickProductId)}
      />

      <CustomModal
        isLoading={isUpdating}
        isOpen={isModalOpen}
        onClose={onModalClose}
        title={"Update Product"}
        oktxt="Update"
        onOkClick={onSubmitHandler}
      >
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="Enter Title"
            name="title"
            value={productToEdit?.title}
            onChange={onChangeHandler}
          />
        </FormControl>

        <FormControl my={"3"}>
          <Text mb="8px">description</Text>
          <Textarea
            value={productToEdit?.description}
            name="description"
            onChange={handledesChange}
            placeholder="Enter description"
            size="sm"
          />
        </FormControl>
        <FormControl my={"3"}>
          <FormLabel>Price</FormLabel>
          <NumberInput
            defaultValue={productToEdit?.price}
            name="price"
            onChange={onChangePriceHandler}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl my={"3"}>
          <FormLabel>Count in Stock</FormLabel>
          <NumberInput
            defaultValue={productToEdit?.stock}
            name="stock"
            onChange={onChangeStockHandler}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>Thumbnail</FormLabel>
          <Input
            type="file"
            h={"full"}
            p={2}
            accept="image/png, image/gif, image/jpeg"
            onChange={onChangeThumbnailHandler}
          />
        </FormControl>
      </CustomModal>

      <CustomModal
        isOpen={isCreateModalOpen}
        onClose={onCreateModalClose}
        title={"Update Product"}
        okTxt="Upload"
        onOkClick={onSubmitCreateHandler}
        isLoading={isCreating}
      >
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            my={3}
            placeholder="Product Title"
            name="title"
            value={productToCreate?.title}
            onChange={onChangeCreateHandler}
          />
        </FormControl>

        <FormControl mb={3}>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Product Description"
            name="description"
            value={productToCreate?.description}
            onChange={onChangeCreateHandler}
          />
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Category</FormLabel>
          <Select
            placeholder="Select category"
            name="category"
            onChange={onChangeCreateHandler}
            value={productToCreate?.category}
          >
            {categoriesData?.data?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.attributes.title}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl mb={3}>
          <FormLabel>Price</FormLabel>
          <NumberInput
            name="price"
            defaultValue={productToCreate?.price}
            onChange={onChangePriceCreateHandler}
            precision={2}
            step={0.2}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl my={3}>
          <FormLabel>Count in Stock</FormLabel>
          <NumberInput
            precision={2}
            step={0.2}
            name="stock"
            defaultValue={productToCreate?.stock}
            onChange={onChangeStockCreateHandler}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Thumbnail</FormLabel>
          <Input
            type="file"
            h={"full"}
            p={2}
            accept="image/png, image/gif, image/jpeg"
            onChange={onChangeThumbnailHandler}
          />
        </FormControl>
      </CustomModal>
    </>
  );
};

export default DashboardProductsTable;
