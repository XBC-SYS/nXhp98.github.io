
var keys = 0, jf = 0, hlz = 0, hlzt = 0, hlk = 0;//Կ�� ���� ���˻���ֵ �Ŷӻ���ֵ ���鿨
var itemsX = [];
const items_b = [0];//���Ƿ��ͻ�ֽ� 0�� 1���� 2�ֽ�
var pagesid = 1, totalPagesX = 1;//��ǰҳ ��ҳ��




function drawLottery(x, prizes, PZX) {//x-�齱���� prizes-��Ʒ�б� PZX-�ݴ����б�


    // ����һ�������飬���ڴ洢���е���Ʒ
    const selectedItems = [];

    // �������н�Ʒ���ܸ���
    const totalProbability = prizes.reduce((total, prize) => total + prize.probability, 0);

    // ѭ���齱����
    for (let i = 0; i < x; i++) {
        // ����һ���������ֵ
        const randomProbability = Math.random() * totalProbability;

        // ��ʼ����ǰ���ʺ�ѡ�е���Ʒ
        let currentProbability = 0;
        let selectedItem = null;

        // ������Ʒ�б������������ֵȷ��ѡ�е���Ʒ
        for (const prize of prizes) {
            currentProbability += prize.probability;
            if (randomProbability <= currentProbability) {
                selectedItem = prize.name;
                //ע���޸�
                if (selectedItem.substring(0, 3) == '����x' || selectedItem.substring(0, 3) == '����*') { jf += parseInt(selectedItem.match(/\d+(\.\d+)?/g)[0]); }

                //�������ּӳ�
                break;
            }
        }
        //�����ݴ���
        for (var j = 0; j < PZX.length; j++) {
            if (selectedItem == PZX[j]) {
                addzc(selectedItem);
                break;
            }
        }

        // ��ѡ�е���Ʒ��ӵ�������

        selectedItems.push(selectedItem);
    }
    showPopup(selectedItems);

    // ������ʾ������չʾ���е���Ʒ
    /*
    if (x == 1) {
        newshowPopup(selectedItems, 'jlname');//ע���޸�
        showpages("popdc");//ע���޸�
    }
    else {
        newshowPopup(selectedItems, 'choulist');//ע���޸�
        showpages("popJl");//ע���޸�
    }�ٷ���û��д����*/

    //showPopup(selectedItems);
}
function showPopup(items) {
    // ��ʾ���ֺ͵���
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';

    // �ڵ�������ʾ���е���Ʒ
    const itemList = document.getElementById('prizeList');
    itemList.innerHTML = ''; // ���֮ǰ������

    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        itemList.appendChild(listItem);
    });
}
function hidePopup() {
    // �������ֺ͵���
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('popup').style.display = 'none';
}
function hidePopup1() {
    // �������ֺ͵���
    document.getElementById('overlay1').style.display = 'none';
    document.getElementById('popup1').style.display = 'none';
}

function showpages(st) {//չʾ����
    // ��ȡ����Ԫ��
    var popup = document.getElementById(st);

    // ���õ����ɼ���
    if (popup) {
        popup.style.visibility = "visible";
    }
}
function hiddenpages(st) {//���ص���
    // ��ȡ����Ԫ��
    var popup = document.getElementById(st);

    // ���õ����ɼ���
    if (popup)
        popup.style.visibility = "hidden";
}


function newshowPopup(items, id) {//id�ǿ�չʾҳ����ʲô��дʲô  �콱ҳ��
    var choulistDiv = document.getElementById(id);

    // Clear previous content in choulistDiv
    choulistDiv.innerHTML = '';

    // Loop through items and append each one in <p> tags to choulistDiv
    items.forEach(function (item) {
        var pElement = document.createElement('p');
        pElement.textContent = item;
        choulistDiv.appendChild(pElement);
    });
}


function showGiftContent(items, currentPage) {
    pagesid = currentPage;
    updateDisplay('now', pagesid);
    var container = document.getElementById('showMyGiftContent2');
    var tableContainer = document.getElementById('getGiftContent2');

    // �����������
    tableContainer.innerHTML = '';

    var itemsPerPage = 4;
    var totalPages = Math.ceil(items.length / itemsPerPage);

    totalPagesX = Math.max(1, totalPages);
    updateDisplay('total', totalPagesX);






    var start = (currentPage - 1) * itemsPerPage;
    var end = Math.min(start + itemsPerPage, items.length);

    for (var i = start; i < end; i++) {
        // ��������к͵�Ԫ��
        var row = document.createElement('tr');
        var itemNameCell = document.createElement('th');
        itemNameCell.style.width = '118px';  // ���ÿ��
        row.appendChild(itemNameCell);
        itemNameCell.textContent = items[i];
        var receiveItemCell = document.createElement('th');
        receiveItemCell.style.width = '127px';  // ���ÿ��
        row.appendChild(receiveItemCell);
        var decomposeItemCell = document.createElement('th');
        row.appendChild(decomposeItemCell);

        if (items_b[i] == 0) {
            receiveItemCell.innerHTML = '<a href="javascript:fs(' + (i) + ');" style="color: white;">[����]</a>';
            decomposeItemCell.innerHTML = '<a href="javascript:fj(' + (i) + ');" style="color: white;">[�ֽ�]</a>';
        } else if (items_b[i] == 1) {
            receiveItemCell.innerHTML = '<a href="javascript:void();" style="color: white;">[�ѷ���]</a>';
            decomposeItemCell.innerHTML = '<a href="javascript:void();" style="color: white;">[�ֽ�]</a>';
        } else if (items_b[i] == 2) {
            receiveItemCell.innerHTML = '<a href="javascript:void();" style="color: white;">[����]</a>';
            decomposeItemCell.innerHTML = '<a href="javascript:void();" style="color: white;">[�ѷֽ�]</a>';
        }

        // ������ӵ�tableContainer
        tableContainer.appendChild(row);

    }
}



function fs(id) {
    alert('����' + id);
}
function fj(id) {
    alert('�ֽ�' + id);
}


function updateDisplay(dis, res) {//����ָ��dis�ı�Ϊres
    var Display = document.getElementById(dis);
    if (Display) {
        Display.textContent = res;
    }
}


function addzc(its) {//�ݴ����¼����
    itemsX.unshift(its);
    items_b.unshift(0);
}

