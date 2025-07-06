 import PropTypes from 'prop-types';
    import {
      Table,
      TableBody,
      TableCell,
      TableContainer,
      TableHead,
      TableRow,
      Paper,
      Collapse,
    IconButton,
       Box,
       Typography
     } from '@mui/material';
     import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
     import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
     import { useState } from 'react';
    
    const LogTableRow = ({ log }) => {
      const [open, setOpen] = useState(false);
   
      const formatTimestamp = (timestamp) => {
        return new Date(timestamp * ).toLocaleString();
      };
   
      const renderDetails = (details) => {
        // 这是一个完全重写的、健壮的函数，它能处理所有错误情况
        if (!details) {
          return <Typography sx={{ margin:  }}>No details available</Typography>;
        }
   
        let parsedDetails;
        try {
          // 尝试解析 JSON
          parsedDetails = JSON.parse(details);
        } catch (error) {
        // 如果解析失败 (例如，内容不是有效的 JSON)，则安全地显示原始文本
           return (
             <Box sx={{ margin: 1 }}>
               <Typography variant="h6" gutterBottom component="div">
                 Details (Raw Content)
               </Typography>
               <Typography sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                 {String(details)}
               </Typography>
             </Box>
           );
         }
    
         // 仅当解析成功时，才渲染表格
         return (
           <Box sx={{ margin: 1 }}>
             <Typography variant="h6" gutterBottom component="div">
               Details
             </Typography>
            <Table size="small" aria-label="details">
              <TableBody>
                {Object.entries(parsedDetails).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell component="th" scope="row">
                      {key}
                  </TableCell>
                  <TableCell>{JSON.stringify(value)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Table>
      );
    };
  
    return (
      <>
        <TableRow>
          <TableCell>
               <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell>{formatTimestamp(log.created_at)}</TableCell>
            <TableCell>{log.type}</TableCell>
            <TableCell>{log.model_name}</TableCell>
            <TableCell>{log.prompt_tokens}</TableCell>
            <TableCell>{log.completion_tokens}</TableCell>
            <TableCell>{log.quota}</TableCell>
            <TableCell>{log.token_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                {renderDetails(log.content)}
              </Collapse>
            </TableCell>
          </TableRow>
        </>
      );
    };
   
    LogTableRow.propTypes = {
      log: PropTypes.object.isRequired
    };
   
    const LogsTable = ({ logs }) => {
      return (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>时间</TableCell>
                <TableCell>类型</TableCell>
                <TableCell>模型</TableCell>
                <TableCell>提示</TableCell>
                <TableCell>补全</TableCell>
                <TableCell>额度</TableCell>
                <TableCell>令牌</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log) => (
                <LogTableRow key={log.id} log={log} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    };
   
    LogsTable.propTypes = {
      logs: PropTypes.array.isRequired
    };
   
    export default LogsTable;


