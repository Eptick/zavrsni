#include <cstdlib> 
#include <ctime> 
#include <iostream>
#include <stdio.h>
#include <ratio>
#include <chrono>
#include <iomanip>
using namespace std;

void swap(int* a, int* b)
{
    int t = *a;
    *a = *b;
    *b = t;
}
 
int partition (int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
 
    for (int j = low; j <= high- 1; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);
}
 
void quickSort(int arr[], int low, int high)
{
    if (low < high)
    {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

void merge(int arr[], int l, int m, int r)
{
    int i, j, k;
    int n1 = m - l + 1;
    int n2 =  r - m;
    int L[n1], R[n2];
    for (i = 0; i < n1; i++) {
        L[i] = arr[l + i];
    }
    for (j = 0; j < n2; j++) {
        R[j] = arr[m + 1+ j];
    }
 
    i = 0;
    j = 0;
    k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        }
        else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}
 
void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l+(r-l)/2;
        mergeSort(arr, l, m);
        mergeSort(arr, m+1, r);
        merge(arr, l, m, r);
    }
}

void heapify(int arr[], int n, int i) {
    int largest = i;
    int l = 2*i + 1;
    int r = 2*i + 2;
    if (l < n && arr[l] > arr[largest])
        largest = l;
    if (r < n && arr[r] > arr[largest])
        largest = r;
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}
void heapSort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    for (int i=n-1; i>=0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}
 
void printArray(int arr[], int size)
{
    int i;
    for (i=0; i < size; i++)
        printf("%d ", arr[i]);
    printf("n");
}

void generateArray(int arr[], int size) {
    for(int i = 0; i < size; i++) {
        arr[i] = (rand()%1000)+1; 
    }
}






int main()
{
    int size = 1000000;
    int *arr = new int[size];
    srand((unsigned)time(0)); 
    chrono::high_resolution_clock::time_point start, finish;
    chrono::duration<double> time_span;
    generateArray(arr, size);
    start = chrono::high_resolution_clock::now();
    quickSort(arr, 0, size-1);
    finish = chrono::high_resolution_clock::now();
    time_span = chrono::duration_cast<chrono::duration<double>>(finish - start);
    cout << endl << "Quicksort: "<< fixed << setprecision(4) << time_span.count() << endl;

    generateArray(arr, size);
    start = chrono::high_resolution_clock::now();
    mergeSort(arr, 0, size - 1);
    finish = chrono::high_resolution_clock::now();
    time_span = chrono::duration_cast<chrono::duration<double>>(finish - start);
    cout << "Mergesort: "<< fixed << setprecision(4) << time_span.count() << endl;

    generateArray(arr, size);
    start = chrono::high_resolution_clock::now();
    heapSort(arr, size - 1);
    finish = chrono::high_resolution_clock::now();
    time_span = chrono::duration_cast<chrono::duration<double>>(finish - start);
    cout << "Heapsort: "<< fixed << setprecision(4) << time_span.count() << endl;

    delete arr;

    return 0;
}