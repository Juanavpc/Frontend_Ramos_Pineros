import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import productService from "../../services/productService";
import { useState, useEffect } from "react";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [products, setProducts] = useState([]);
  const [editedProduct, setEditedProduct] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    rol: "",
    precio: 0,
  });
  const [deleteProduct, setDeleteProduct] = useState(0);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const productList = await productService.getProducts();
      setProducts(productList);
    } catch (error) {
      console.error("Error loading products:", error.message);
    }
  };

  const handleEditProductClick = (productId) => {
    console.log(productId)
    const productToEdit = products.find((product) => product.id === productId);
    console.log(productToEdit)
    setEditedProduct(productToEdit);
    setOpenEditModal(true);
  };
  const handleEditProduct = async () => {
    try {
      console.log(editedProduct)
      const editedProductResponse = await productService.editProduct(
        editedProduct
      );
      console.log("Product edited:", editedProductResponse);
      handleCloseEditModal();
      // Actualiza la lista de productos después de la edición
      loadProducts();
    } catch (error) {
      console.error('Error editing product:', error.message);
    }
  };

  const handleNewProductClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCreateProduct = () => {
    // Aquí deberías implementar la lógica para crear un nuevo producto
    console.log("New Product created!");
    handleCloseModal();
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleDeleteProductClick = (productId) => {
    console.log(productId);
    setDeleteProduct(productId); // Almacena el ID del producto seleccionado
    setOpenDeleteConfirmation(true);
  };
  const handleDeleteProduct = async () => {
    try {
      console.log("Deleting product:", deleteProduct);
      const deleteProductResponse = await productService.deleteProduct(
        deleteProduct
      );
      console.log("Product edited:", deleteProductResponse);
      handleCloseEditModal();

      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error.message);
    } finally {
      handleCloseDeleteConfirmation();
    }
  };

  const handleCloseDeleteConfirmation = () => {
    setOpenDeleteConfirmation(false);
  };


  // Asumiendo que tienes la información del rol del usuario en el contexto
  const userRole = "admin"; // Reemplaza esto con la obtención real del rol del usuario

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "nombre",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "descripcion",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "rol",
      headerName: "Role",
      flex: 1,
      renderCell: ({ row: { rol } }) => {
        return (
          <Box width="60%">
            {rol === "cortador"}
            {rol === "guarnecedor "}
            {rol === "ensamblador"}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {rol}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "precio",
      headerName: "Price",
      flex: 1,
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row: { id } }) => {
        return (
          <Box
            width="100%"
            height="75%"
            display="flex"
            justifyContent="space-evenly"
            borderRadius="4px"
          >
            <Box
              width="30%"
              margin="4px 0 4px 0"
              p="5px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              backgroundColor={colors.greenAccent[600]}
              borderRadius="4px"
              onClick={()=>{handleDeleteProductClick(id)}}
              style={{ cursor: "pointer" }}
            >
              <DeleteOutlineIcon />
            </Box>
            <Box
              width="30%"
              margin="4px 0 4px 0"
              p="5px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              backgroundColor={colors.greenAccent[600]}
              borderRadius="4px"
              onClick={() => handleEditProductClick(id)}
              style={{ cursor: "pointer" }}
            >
              <EditIcon />
            </Box>
          </Box>
        );
      },
    },
  ];
  return (
    <Box m="20px">
      <Header
        title="PRODUCTS"
        subtitle="List of products for Future Reference"
      />
      {userRole === "admin" && ( // Mostrar el botón solo si el usuario es administrador
        <Box mb="20px" display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            sx={{ backgroundColor: colors.blueAccent[500] }}
            onClick={handleNewProductClick}
            style={{ cursor: "pointer" }}
          >
            <AddIcon></AddIcon>
            New Product
          </Button>
        </Box>
      )}
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid rows={products} columns={columns} />
      </Box>

      {/* Modal para crear nuevo producto */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography sx={{ mt: 1, mb: 1 }} variant="h2" fontWeight="bold">
              New Product
            </Typography>
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <Box p={3}>
          {/* Formulario para crear nuevo producto */}
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            sx={{ marginTop: "0px" }}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            sx={{ marginTop: "0px" }}
          />
          <Select
            value={deleteProduct}
            onChange={(e) => setDeleteProduct(e.target.value)}
            label="Role"
            fullWidth
            displayEmpty
            margin="normal"
            variant="outlined"
            required
            sx={{ marginBottom: "8px" }}
          >
            <MenuItem value="" disabled>
              Role
            </MenuItem>
            <MenuItem value="role1">Cortador</MenuItem>
            <MenuItem value="role2">Ensamblador</MenuItem>
            <MenuItem value="role3">Guarnecedor</MenuItem>
          </Select>
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            sx={{ marginTop: "0px" }}
          />
          <Box display="flex" justifyContent="center" marginTop="12px">
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateProduct}
            >
              Create Product
            </Button>
          </Box>
        </Box>
      </Dialog>

      {/* Modal para editar producto */}
      <Dialog open={openEditModal} onClose={handleCloseEditModal}>
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography sx={{ mt: 1, mb: 1 }} variant="h2" fontWeight="bold">
              Edit Product
            </Typography>
            <IconButton onClick={handleCloseEditModal}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <Box p={3}>
          {/* Campos para editar el producto */}
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editedProduct?.nombre || ""}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, nombre: e.target.value })
            }
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editedProduct?.descripcion || ""}
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                descripcion: e.target.value,
              })
            }
          />
          <Select
            value={editedProduct?.rol || ""}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, rol: e.target.value })
            }
            label="Role"
            fullWidth
            displayEmpty
            margin="normal"
            variant="outlined"
            required
            sx={{ marginBottom: "8px" }}
          >
            <MenuItem value="" disabled>
              Role
            </MenuItem>
            <MenuItem value="cortador">Cortador</MenuItem>
            <MenuItem value="ensamblador">Ensamblador</MenuItem>
            <MenuItem value="guarnecedor">Guarnecedor</MenuItem>
          </Select>
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editedProduct?.precio || ""}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, precio: e.target.value })
            }
          />
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditProduct}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Dialog>

      {/* Modal de confirmación de eliminación */}
      <Dialog
        open={openDeleteConfirmation}
        onClose={handleCloseDeleteConfirmation}
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontWeight="bold" variant="h4">
              Confirm Deletion
            </Typography>
            <IconButton onClick={handleCloseDeleteConfirmation}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <Box p={3}>
          <Typography>
            Are you sure you want to delete the selected product?
          </Typography>
          <Box display="flex" justifyContent="center" marginTop="15px">
            <Button
              variant="contained"
              color="primary"
              onClick={handleDeleteProduct}
            >
              Confirm Delete
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Contacts;
