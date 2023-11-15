import { Box, Button, Dialog, DialogTitle, IconButton, TextField, Typography, Select, MenuItem } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

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

  const handleEditProductClick = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleEditProduct = () => {
    // Realiza la lógica de edición del producto aquí
    console.log("Product edited:", selectedProduct);
    handleCloseEditModal();
  };

  const handleDeleteProductClick = () => {
    setOpenDeleteConfirmation(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setOpenDeleteConfirmation(false);
  };

  const handleDeleteProduct = () => {
    // Realiza la lógica de eliminación del producto aquí
    console.log("Product deleted:", selectedProduct);
    handleCloseDeleteConfirmation();
  };


  // Asumiendo que tienes la información del rol del usuario en el contexto
  const userRole = "admin"; // Reemplaza esto con la obtención real del rol del usuario

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "description",
      headerName: "Description",
      flex:1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
          >
            {access === "Cortador"}
            {access === "Guarnecedor "}
            {access === "Ensamblador"}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "price",
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
      renderCell: () => {
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
              onClick={handleDeleteProductClick}
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
              onClick={handleEditProductClick}
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
        <DataGrid
          rows={mockDataContacts}
          columns={columns}
        />
      </Box>

      {/* Modal para crear nuevo producto */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography sx={{mt:1, mb:1}} variant="h2" fontWeight="bold">New Product</Typography>
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
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
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
          <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography sx={{mt:1, mb:1}} variant="h2" fontWeight="bold">Edit Product</Typography>
            <IconButton onClick={handleCloseEditModal}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <Box p={3}>
          {/* Agrega aquí los campos y controles para editar el producto */}
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{ marginTop: "0px" }}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{ marginTop: "0px" }}
          />
          <Select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
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
            sx={{ marginTop: "0px" }}
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
      <Dialog open={openDeleteConfirmation} onClose={handleCloseDeleteConfirmation}>
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontWeight="bold" variant="h4">Confirm Deletion</Typography>
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
