import { Box, Button, Dialog, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Select, MenuItem} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme, Typography } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

const Productions = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedProduction, setSelectedProduction] = useState("");
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [openNewConfirmation, setOpenNewConfirmation] = useState(false);
  // Asumiendo que tienes la información del rol del usuario en el contexto
  const userRole = "cortador"; // Reemplaza esto con la obtención real del rol del usuario

  const handleNewProductionClick = () => {
    setOpenNewConfirmation(true);
  };

  const handleCloseNewModal = () => {
    setOpenNewConfirmation(false);
  };

  const handleCreateProduction = () => {
    // Aquí deberías implementar la lógica para crear un nuevo producto
    console.log("New Production created!");
    handleCloseNewModal();
  };

  const handleVisibilityClick = () => {
    setOpenModal(true);
    if (userRole !== "admin") {
      setOpenModal(true);
    } else {
      // Lógica adicional si es necesario
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleEditProductionClick = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleEditProduction = () => {
    // Realiza la lógica de edición del producto aquí
    console.log("Production edited:");
    handleCloseEditModal();
  };

  const handleDeleteProductionClick = () => {
    setOpenDeleteConfirmation(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setOpenDeleteConfirmation(false);
  };

  const handleDeleteProduction = () => {
    // Realiza la lógica de eliminación del producto aquí
    console.log("Production deleted:");
    handleCloseDeleteConfirmation();
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Id User"},
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
    },
    {
        field: "status",
        headerName: "Status",
        flex: 1,
    },
    {
        field: "compensation",
        headerName: "Compensation",
        flex: 1,
    },
    {
        field: "total",
        headerName: "Total",
        type: "number",
        headerAlign: "left",
        align: "left",
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: () => {
        if (userRole === "admin"){
          return(
            <Box
              width="50%"
              margin="4px 0 4px 0"
              p="5px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              backgroundColor={colors.greenAccent[600]}
              borderRadius="4px"
              onClick={handleVisibilityClick}
              style={{ cursor: "pointer" }}
            >
              <VisibilityIcon />
            </Box>
          );
        }else{
          return (
            <Box
              width="100%"
              height="75%"
              display="flex"
              justifyContent="space-between"
              borderRadius="4px"
            >
              <Box
                width="30%"
                p="5px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                backgroundColor={colors.greenAccent[600]}
                borderRadius="4px"
                onClick={handleDeleteProductionClick}
                style={{ cursor: "pointer" }}
              >
                <DeleteOutlineIcon />
              </Box>
              <Box
                width="30%"
                p="5px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                backgroundColor={colors.greenAccent[600]}
                borderRadius="4px"
                onClick={handleEditProductionClick}
                style={{ cursor: "pointer" }}
              >
                <EditIcon />
              </Box>
              <Box
                width="30%"
                p="5px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                backgroundColor={colors.greenAccent[600]}
                borderRadius="4px"
                onClick={handleVisibilityClick}
                style={{ cursor: "pointer" }}
              >
                <VisibilityIcon />
              </Box>
            </Box>
          );
        }
      },
    },
  ];
  return (
    <Box m="20px">
      <Header
        title="PRODUCTIONS"
        subtitle="List of productions for Future Reference"
      />
      {userRole !== "admin" && ( // Mostrar el botón solo si el usuario no es administrador
        <Box mb="20px" display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            sx={{ backgroundColor: colors.blueAccent[500] }}
            onClick={handleNewProductionClick}
            style={{ cursor: "pointer" }}
          >
            <AddIcon></AddIcon>
            New Production
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

      {/* Modal para visualizar una produccion (User Admin)*/}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography sx={{mt:1, mb:1}} variant="h2" fontWeight="bold">Production Detail</Typography>
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        {/* Contenido de la tabla dentro del modal */}
        <Box p={3} width={600} maxHeight={400} overflow="auto">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Aquí deberías mapear tus datos y renderizar filas */}
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Product A</TableCell>
                  <TableCell>10</TableCell>
                  <TableCell>2023-01-01</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Dialog>

      {/* Modal para crear nueva produccion */}
      <Dialog open={openNewConfirmation} onClose={handleCloseNewModal}>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography sx={{mt:1, mb:1}} variant="h2" fontWeight="bold">New Production</Typography>
            <IconButton onClick={handleCloseNewModal}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <Box p={3}>
          {/* Formulario para crear nueva produccion */}
          <TextField
            label="Quantity of products"
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{ marginTop: "8px" }}
          />
          <Select
            value={selectedProduction}
            onChange={(e) => setSelectedProduction(e.target.value)}
            label="Product"
            fullWidth
            displayEmpty
            margin="normal"
            variant="outlined"
            required
            sx={{ marginBottom: "8px" }}
          >
            <MenuItem value="" disabled>
              Product
            </MenuItem>
            <MenuItem value="product1">Suela</MenuItem>
            <MenuItem value="product2">Moño</MenuItem>
            <MenuItem value="product3">Cuero</MenuItem>
          </Select>
          <TextField
            label="Production Name"
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
              onClick={handleCreateProduction}
            >
              Create Production
            </Button>
          </Box>
        </Box>
      </Dialog>

      {/* Modal para editar produccion */}
      <Dialog open={openEditModal} onClose={handleCloseEditModal}>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography sx={{mt:1, mb:1}} variant="h2" fontWeight="bold">Edit Production</Typography>
            <IconButton onClick={handleCloseEditModal}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <Box p={3}>
          {/* Formulario para editar una produccion */}
          <TextField
            label="Id"
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{ marginBottom: "0px" }}
          />
          <TextField
            label="Quantity of products"
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{ marginTop: "8px" }}
          />
          <Select
            value={selectedProduction}
            onChange={(e) => setSelectedProduction(e.target.value)}
            label="Product"
            fullWidth
            displayEmpty
            margin="normal"
            variant="outlined"
            required
            sx={{ marginBottom: "8px" }}
          >
            <MenuItem value="" disabled>
              Product
            </MenuItem>
            <MenuItem value="product1">Suela</MenuItem>
            <MenuItem value="product2">Moño</MenuItem>
            <MenuItem value="product3">Cuero</MenuItem>
          </Select>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditProduction}
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
          Are you sure you want to delete the selected production?
        </Typography>
        <Box display="flex" justifyContent="center" marginTop="15px">
          <Button
            variant="contained"
            color="primary"
            onClick={handleDeleteProduction}
          >
            Confirm Delete
          </Button>
        </Box>
      </Box>
      </Dialog>

    </Box>
  );
};

export default Productions;